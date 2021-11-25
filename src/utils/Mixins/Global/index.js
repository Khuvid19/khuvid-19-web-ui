/*
 * 전역으로 사용되는 mixin 지정입니다.
 */

// method
import formatDate from './methods/formatDate';

export default {
  methods: {
    ...formatDate.methods,
  },
};
