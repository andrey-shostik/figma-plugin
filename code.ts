const generateEmbedLink = () => {
  const { selection } = figma.currentPage;

  if (selection?.length) {
    const embed = "https://www.figma.com/embed?embed_host=share&url=";
    const fileURI = `https://www.figma.com/file/${figma.fileKey}/${figma.root.name}?node-id=${selection[0].id}`;
    return `${embed}${encodeURIComponent(fileURI)}`;
  }

  return null;
};

const addLinkToElement = (link) => {
  const { selection } = figma.currentPage;
  for (const node of selection) {
    console.log(node)
    node.setRelaunchData({ viewLink: '' })
    node.setPluginData(node.id, link)
  }
};

figma.ui.onmessage = msg => {
  if (msg.type === 'add-link') {
    addLinkToElement(msg.link)
    const link = generateEmbedLink();
    console.log(link, "generateEmbedLink");
  }
  figma.closePlugin();
};

figma.on('run', ({command}) => {
  const { selection } = figma.currentPage;
  console.log(selection);
  if(command === 'addLink') {
    figma.showUI(__uiFiles__.ui_addlink, {
      width: 300,
      height: 200,
    });
  }

  if(command === 'viewLink') {
    const link = selection[0].getPluginData(selection[0].id)
    console.log(link)
    figma.showUI(__uiFiles__.ui_viewlink, {
      width: 800,
      height: 600,
    });
    figma.ui.postMessage(link)
  }

  if(command === 'deleteLink') {
    const { selection } = figma.currentPage;
    for (const node of selection) {
      node.setRelaunchData({})
    }
    figma.closePlugin();
  }
});
