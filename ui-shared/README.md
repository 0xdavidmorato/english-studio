ui-shared

Pasta de componentes e lógica extraída do scaffold original (tangle) para reaproveitamento entre web (Next.js) e mobile (Expo/React Native).

O que contém:
- src/assessment: lógica de AssessmentSession, scoring e tipos
- src/certificate: criação de detalhes de certificado
- src/infrastructure: stores e content source (Browser store, FileSystemContentSource)
- src/ui: componentes React (QuizPanel, ContentPanel, CertificatePanel, KnowledgeNetwork, NavigationLegend, NodeIcon, OrganicNavigation, TangleExperience)
- docs/assets: imagens e logos
- app-globals.css: referencia de estilos globais para tokens

Próximos passos recomendados:
1) Extrair tokens de design (cores, tipografia) de app-globals.css para um arquivo tokens.{js,ts} a ser compartilhado
2) Adaptar imports que usam Node-only APIs (node:fs) antes de tentar reutilizar em mobile
3) Substituir react-markdown e jsPDF por equivalentes mobile quando portar (react-native-render-html, soluções de PDF/Share)
4) Criar um package local (workspace) ou npm package privado com ui-shared para importar em web e mobile

Notas:
- Estrutura normalizada: src/infrastructure/* (anteriormente havia uma duplicação infrastructure/infrastructure)
- Mantém os arquivos originais sem alterações funcionais — revise os arquivos copiados antes de publicar
