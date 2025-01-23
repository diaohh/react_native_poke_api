export function sortElements(array: any[]) {
  let sortedArray = array.sort((pokeA, pokeB) => pokeB.height - pokeA.height);
	return sortedArray;
}
