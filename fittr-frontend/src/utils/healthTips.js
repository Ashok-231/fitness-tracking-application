export const getBmiTip = (bmi) => {
  if (bmi === 0) return "Enter your height and weight to get health tips.";

  if (bmi < 18.5)
    return "🟡 You are underweight. Eat more protein and do strength training.";

  if (bmi < 25)
    return "🟢 Your BMI is healthy. Maintain it with regular workouts.";

  if (bmi < 30)
    return "🟠 You are slightly overweight. Try walking and cardio daily.";

  return "🔴 Your BMI is high. Start with light exercises and portion control.";
};

export const getActivityTip = (calories) => {
  if (calories === 0) return "⚠️ You haven't worked out today. Try a 15-minute walk.";

  if (calories < 200) return "🙂 A small workout done. Try to move a little more.";

  if (calories < 500) return "💪 Good job! You're doing well today.";

  return "🔥 Amazing! You burned a lot of calories today!";
};
