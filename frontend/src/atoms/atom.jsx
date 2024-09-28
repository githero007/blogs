import { atom } from 'recoil';
const tokenState = atom({
    key: 'tokenState', // unique ID (with respect to other atoms/selectors)
    default: '', // default value (aka initial value)
});
const blogState = atom({
    key: "blogState",
    default: [],
})
export default tokenState;
export { blogState };