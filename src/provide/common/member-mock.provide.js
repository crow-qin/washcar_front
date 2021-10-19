import { ref } from "vue";
// 模拟会员数据
const memberMock = () => {
  const name = 'memberMock';
  const memberMock = ref([
    {
      phone: '13543212345',
      name: '先龙',
      memberId: '1',
      recharge: 1500,
      consumption: 100
    },
    {
      phone: '14743212345',
      name: '窦融',
      memberId: '2',
      recharge: 110.5,
      consumption: 30 
    },
    {
      phone: '18043212345',
      name: '张挥',
      memberId: '2',
      recharge: 2100.5,
      consumption: 600
    },
    {
      phone: '15243212345',
      name: '妘载',
      memberId: '2',
      recharge: 1110.5,
      consumption: 530
    },
    {
      phone: '14643212345',
      name: '田况',
      memberId: '2',
      recharge: 3500,
      consumption: 420 
    },
  ]);
  // 返回含有搜索字的会员
  const filterMember = (text) => {
    let reg = new RegExp(`${text.trim()}`);
    return memberMock.value.filter(v => {
      return reg.test(v.name) || reg.test(v.phone);
    });
  };
  return {
    memberMock,
    filterMember,
    name,
  };
};

export default memberMock;