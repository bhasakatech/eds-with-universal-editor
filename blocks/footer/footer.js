
export default function decorate(block) {
  console.log('decorate footer', block);
  console.log('block child', block.children);
   console.log('block 8thchild', block.children[8]);
  console.log('block 9thchild of child', block.children[9].children);
  console.log('block 9thchild of child of child', block.children[9].children[0].children);
  

}
