import { reactive } from "vue";
const name = 'currentMember';
const currentMember = () => {
  const currentMember = reactive({data: {}});
  const editCurrentMember = (data) => {
    currentMember.data = data;
  };
  return {
    currentMember,
    editCurrentMember,
    name,
  };
};

export default currentMember;