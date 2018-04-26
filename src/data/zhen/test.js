let items = [];

for (let i = 0; i < 10; i++) {
  let obj = {
    "classId": i + 1,
    "className": "第" + (i + 1) + "班",
    "grade": gradeFn(i)      // 年级 （5：托班，4：小班，3：中班，2：大班，1：学前班）
  };
  items.push(obj)
}

function gradeFn(num) {
  return num % 5 + 1;
}

const info = {
  "code": "000",
  "msg": "错误信息",
  "data": items
};
module.exports = info;

