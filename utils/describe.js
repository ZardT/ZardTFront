const describe = (props) => {
  const describeobj = {
    S: { name: "极高投资价值", color: "#4C68EF" },
    "A+": { name: "高投资价值", color: "#4C68EF" },
    A: { name: "有投资价值", color: "#4C68EF" },
    "B+": { name: "稳定", color: "#F2994A" },
    B: { name: "较稳定", color: "#F2994A" },
    "C+": { name: "一般风险", color: "#F2994A" },
    C: { name: "实质风险", color: "#EB5757" },
    "D+": { name: "高风险", color: "#EB5757" },
    D: { name: "不建议投资", color: "#EB5757" },
    NA: { name: "不建议投资", color: "#EB5757" },
  };

  return describeobj[props] || describeobj["NA"];
};
export default describe;
