import { reactive } from "vue";

const carSizeList = () => {
  const name = 'carSizeList';
  const carSizeList = reactive([
    {
      carSizeType: 'CT01',
      carSizeName: '车型1',
      carSizeRate: 1
    },
    {
      carSizeType: 'CT02',
      carSizeName: '车型2',
      carSizeRate: 1.2
    },
    {
      carSizeType: 'CT03',
      carSizeName: '车型3',
      carSizeRate: 1.3
    },
    {
      carSizeType: 'CT04',
      carSizeName: '车型4',
      carSizeRate: 1.4
    },
  ]);
  const findCurCarSizeIndex = (type) => {
    return carSizeList.findIndex(v => v.carSizeType === type);
  };
  const editCarSizeList = (type, params) => {
    const index = findCurCarSizeIndex(type);
    if (index > -1) {
      editCarSizeList[index] = {...editCarSizeList[index], params};
    } else {
      console.error(`找不到改carSize对象, ${type}是否正确`);
    }
  };
  const addItem = (params) => {
    const index = carSizeList.findIndex(v => {
      return v.carSizeName == params.carSizeName;
    });
    if (index > -1) {
      return '已有名称相同的类型项';
    } else {
      let type = 'CT' + new Date().getTime();
      carSizeList.push({...params, carSizeType: type});
      return '';
    }
  };
  return {
    carSizeList,
    editCarSizeList,
    name,
    addItem,
  };
};

export default carSizeList;
