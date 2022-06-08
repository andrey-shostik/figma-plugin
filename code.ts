const generateEmbedLink = () => {
  const { selection } = figma.currentPage;

  if (selection?.length) {
    const embed = "https://www.figma.com/embed?embed_host=share&url=";
    const fileURI = `https://www.figma.com/file/${figma.fileKey}/${figma.root.name}?node-id=${selection[0].id}`;
    return `${embed}${encodeURIComponent(fileURI)}`;
  }

  return null;
};

const run = async () => {
  const link = generateEmbedLink();
  console.log(link, "generateEmbedLink");

  figma.showUI(__html__, {
    width: 800,
    height: 600,
  });
};
run();
