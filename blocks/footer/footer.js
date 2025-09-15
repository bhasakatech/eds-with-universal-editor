
export default function decorate(block) {
  console.log('decorate footer', block);
  console.log('block child', block.children);
  console.log('block child of child', block.children[0].children);
  console.log('block child of child of child', block.children[0].children[0].children);
  

}
