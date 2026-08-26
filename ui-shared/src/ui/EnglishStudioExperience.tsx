"use client";

import { useEffect, useRef, useState, type PointerEvent } from "react";
import {
  AssessmentSession,
  getQuizForNode,
  englishStudioQuizzes,
  type AssessmentProgressSummary,
  type NodeAssessmentProgress,
  type QuizAnswer,
} from "../assessment";
import { createCertificateDetails } from "../certificate";
import type { EngineEvent } from "../engine";
import {
  clearAssessmentSession,
  loadAssessmentSession,
  saveAssessmentSession,
} from "../infrastructure/assessment";
import { EnglishStudioEngine } from "../engine";
import type { Graph } from "../graph";
import {
  createPresentationState,
  type PresentationState,
} from "../presentation";
import { ContentPanel } from "./ContentPanel";
import { CertificatePanel } from "./CertificatePanel";
import { KnowledgeNetwork } from "./KnowledgeNetwork";
import { NavigationLegend } from "./NavigationLegend";
import logoDavid from "../../docs/assets/logo_david.png";

type FocusReturnTarget = HTMLElement | SVGElement;

interface EnglishStudioExperienceProps {
  readonly graph: Graph;
  readonly contentByNodeId: Readonly<Record<string, string>>;
}

export function EnglishStudioExperience({
  graph,
  contentByNodeId,
}: EnglishStudioExperienceProps) {
  const engineRef = useRef<EnglishStudioEngine | null>(null);
  const assessmentSessionRef = useRef<AssessmentSession | null>(null);
  const experienceRef = useRef<HTMLElement | null>(null);
  const contentTriggerRef = useRef<FocusReturnTarget | null>(null);
  const certificateTriggerRef = useRef<HTMLButtonElement | null>(null);
  if (!engineRef.current) {
    engineRef.current = new EnglishStudioEngine(graph);
  }
  if (!assessmentSessionRef.current) assessmentSessionRef.current = new AssessmentSession();

  const [state, setState] = useState<PresentationState>(() =>
    createPresentationState(engineRef.current!),
  );
  const [motionEnabled, setMotionEnabled] = useState(false);
  const [networkLevel, setNetworkLevel] = useState<0 | 1 | 2>(0);
  const [activeClusterId, setActiveClusterId] = useState<string | null>(null);
  const [showCertificate, setShowCertificate] = useState(false);
  const [, setAssessmentRevision] = useState(0);

  useEffect(() => {
    assessmentSessionRef.current = loadAssessmentSession();
    setAssessmentRevision((revision) => revision + 1);
  }, []);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotion = () => setMotionEnabled(!preference.matches);
    updateMotion();
    preference.addEventListener("change", updateMotion);
    return () => preference.removeEventListener("change", updateMotion);
  }, []);

  function dispatch(event: EngineEvent) {
    engineRef.current!.dispatch(event);
    setState(createPresentationState(engineRef.current!));
  }

  const focusedNode = state.nodes.find(
    (node) => node.emphasis === "primary",
  );

  function handlePointerMove(event: PointerEvent<HTMLElement>) {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    event.currentTarget.style.setProperty("--look-x", `${x * -9}px`);
    event.currentTarget.style.setProperty("--look-y", `${y * -7}px`);
  }

  function revealCore() {
    dispatch("blur");
    setActiveClusterId(null);
    setNetworkLevel(0);
  }

  function revealClusters() {
    dispatch("blur");
    setActiveClusterId(null);
    setNetworkLevel(1);
  }

  function revealCluster(clusterId: string) {
    dispatch("blur");
    setActiveClusterId(clusterId);
    setNetworkLevel(2);
  }

  function focusNode(nodeId: string, trigger?: FocusReturnTarget) {
    if (trigger) {
      contentTriggerRef.current = trigger;
    } else if (!focusedNode) {
      const activeElement = document.activeElement;
      if (activeElement instanceof HTMLElement || activeElement instanceof SVGElement) {
        contentTriggerRef.current = activeElement;
      }
    }
    const node = state.nodes.find((candidate) => candidate.id === nodeId);
    if (node) {
      setActiveClusterId(node.clusterId);
      setNetworkLevel(2);
    }
    dispatch({ type: "focus", nodeId });
  }

  function closeFocusedNode() {
    dispatch("blur");
    setNetworkLevel(2);
    requestAnimationFrame(() => contentTriggerRef.current?.focus());
  }

  function closeCertificate() {
    setShowCertificate(false);
    requestAnimationFrame(() => certificateTriggerRef.current?.focus());
  }

  function resetAssessmentProgress() {
    const confirmed = window.confirm(
      "Quer reiniciar todo o progresso local? Leituras e resultados dos quizzes deste browser serão apagados.",
    );
    if (!confirmed) return;

    clearAssessmentSession();
    assessmentSessionRef.current = new AssessmentSession();
    setShowCertificate(false);
    setAssessmentRevision((revision) => revision + 1);
  }

  function markFocusedContentRead() {
    if (!focusedNode) return;
    assessmentSessionRef.current!.markContentRead(focusedNode.id);
    saveAssessmentSession(assessmentSessionRef.current!);
    setAssessmentRevision((revision) => revision + 1);
  }

  const focusedQuiz = focusedNode ? getQuizForNode(focusedNode.id) : null;
  const focusedAssessmentProgress = focusedQuiz
    ? assessmentSessionRef.current.getProgress(focusedQuiz.nodeId)
    : null;
  const requiredQuizNodeIds = englishStudioQuizzes.map((quiz) => quiz.nodeId);
  const assessmentByNodeId: Readonly<Record<string, NodeAssessmentProgress>> =
    Object.fromEntries(
      requiredQuizNodeIds.map((nodeId) => [
        nodeId,
        assessmentSessionRef.current!.getProgress(nodeId),
      ]),
    );
  const assessmentByClusterId: Readonly<Record<string, AssessmentProgressSummary>> =
    Object.fromEntries(
      state.clusters.map((cluster) => [
        cluster.id,
        assessmentSessionRef.current!.summarize(
          cluster.nodeIds.filter((nodeId) => requiredQuizNodeIds.includes(nodeId)),
        ),
      ]),
    );
  const approvedQuizCount = requiredQuizNodeIds.filter((nodeId) => assessmentSessionRef.current!.getProgress(nodeId).isPassed).length;
  const certificateEligible = assessmentSessionRef.current.isCertificateEligible(requiredQuizNodeIds);
  const hasAssessmentProgress = Object.values(assessmentByNodeId).some(
    (progress) => progress.isRead || progress.attempts.length > 0,
  );

  return (
    <main
      ref={experienceRef}
      className={`experience ${focusedNode ? "has-focus" : ""} ${networkLevel === 2 ? "has-expanded-network" : ""} ${motionEnabled ? "motion-on" : "motion-off"}`}
      onPointerMove={handlePointerMove}
    >
      <header className="experience-header">
        <div className="brand">
          <img
            className="brand-logo"
            src={logoDavid.src}
            width={logoDavid.width}
            height={logoDavid.height}
            alt="David Morato"
          />
        </div>
        <div className="header-tools">
          <button
            type="button"
            className="motion-control"
            aria-pressed={motionEnabled}
            onClick={() => setMotionEnabled((enabled) => !enabled)}
          >
            <span className="motion-control-dot" aria-hidden="true" />
            Movimento {motionEnabled ? "ativo" : "pausado"}
          </button>
          <div className="experience-status" aria-live="polite">
            <span className="status-pulse" />
            <span>{state.stage}</span>
            <span className="status-separator">/</span>
            <span>{state.nodes.length} conceitos</span>
          </div>
          <button ref={certificateTriggerRef} className="certificate-control" type="button" disabled={!certificateEligible} onClick={() => setShowCertificate(true)}>{certificateEligible ? "Emitir certificado" : `Certificado ${approvedQuizCount}/${requiredQuizNodeIds.length}`}</button>
          {hasAssessmentProgress ? <button className="progress-reset-control" type="button" onClick={resetAssessmentProgress}>Reiniciar progresso</button> : null}
        </div>
      </header>

      <NavigationLegend
        clusters={state.clusters}
        activeClusterId={activeClusterId}
        level={networkLevel}
        assessmentByClusterId={assessmentByClusterId}
        onCoreSelect={revealCore}
        onClusterSelect={revealCluster}
      />

      <KnowledgeNetwork
        nodes={state.nodes}
        clusters={state.clusters}
        connections={state.connections}
        level={networkLevel}
        activeClusterId={activeClusterId}
        assessmentByNodeId={assessmentByNodeId}
        assessmentByClusterId={assessmentByClusterId}
        onCoreFocus={revealClusters}
        onClusterFocus={revealCluster}
        onFocus={focusNode}
      />

      <div className="journey-controls" aria-label="Percurso de exploração">
        <button
          type="button"
          className={state.journey?.id === "core-narrative" ? "active" : ""}
          onClick={() =>
            dispatch({ type: "journeyStart", journeyId: "core-narrative" })
          }
        >
          Percurso guiado
        </button>
        <button
          type="button"
          className={state.journey?.id === "free-exploration" ? "active" : ""}
          onClick={() =>
            dispatch({ type: "journeyStart", journeyId: "free-exploration" })
          }
        >
          Exploração livre
        </button>
      </div>

      <div className="experience-guidance" aria-live="polite">
        <span className="guidance-mark" aria-hidden="true" />
        <span>{focusedNode ? "Relações em foco" : "Selecione um nó para explorar"}</span>
        <span className="guidance-detail">{state.nodes.length} conceitos ligados</span>
      </div>

      {focusedNode ? (
        <ContentPanel
  node={focusedNode}
  markdown={contentByNodeId[focusedNode.id] ?? ""}
  quiz={focusedQuiz}
  assessmentProgress={focusedAssessmentProgress}
  onQuizSubmit={(answers: readonly QuizAnswer[]) => {
    const result = assessmentSessionRef.current!.submit(focusedQuiz!, answers);
    saveAssessmentSession(assessmentSessionRef.current!);
    setAssessmentRevision((revision) => revision + 1);
    return result;
  }}
  onClose={closeFocusedNode}
  onComplete={() => {
    markFocusedContentRead();
    dispatch({ type: "complete", nodeId: focusedNode.id });

    const currentIndex = state.nodes.findIndex(
      (node) => node.id === focusedNode.id,
    );

    const nextNode = state.nodes[currentIndex + 1];

    if (nextNode) {
      focusNode(nextNode.id);
    } else {
      closeFocusedNode();
    }
  }}
/>
      ) : null}
      {showCertificate ? <CertificatePanel onClose={closeCertificate} detailsFor={(participantName) => createCertificateDetails(assessmentSessionRef.current!, requiredQuizNodeIds, participantName)} /> : null}
    </main>
  );
}
