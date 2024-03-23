import plusBox from '../Json/plusBox.json'
export default function filterAndRemove(data) {
  let updatedData = [];

  for (let i = 1; i < data.length; i++) {
    const child = data[i];
    // -> adding plus button to spouse
    if (child?.userChildren?.length > 0 && child?.spouses?.length <= 0) {
      child?.spouses?.push(plusBox);
    }
    if (child.spouses && child.spouses.length > 0) {
      // Check if spouses exist and add gap if necessary
      const addEmptySpace = Array(child.spouses.length).fill({
        _id: '',
        personalDetails: {
          gender: '',
          relationStatus: '',
          profilepic: null,
          livingStatus: '',
          name: '',
          middlename: '',
          lastname: '',
        },
        parents: child.parents,
        wifes: [],
        wifeChildrens: null,
        husbandChildrens: null,
        userChildren: [],
        husbands: [],
        spouses: [],
      });
      updatedData = [...updatedData, child, ...addEmptySpace];
    } else {
      updatedData.push(child);
    }
  }
  return updatedData;
}
