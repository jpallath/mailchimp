export const fetchFunction = async (
  endpointAddition: string,
  method: string,
  data: {}
) => {
  try {
    const response = await fetch(`http://localhost:3001/${endpointAddition}`, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: method === "GET" ? undefined : JSON.stringify(data),
    });
    return await response;
  } catch (err) {
    console.log(err);
  }
};

export const formatDate = (dateString: Date) => {
  const getTimes = (date: Date) => {
    const hour = date.getHours();
    const minute = date.getMinutes();
    const amPm = hour < 12 ? "AM" : "PM";
    const formattedHour = hour % 12 || 12;
    return { minute, amPm, formattedHour };
  };
  const date = new Date(dateString);
  const now = new Date();
  const differenceInDays =
    Math.abs(now.getTime() - date.getTime()) / (1000 * 3600 * 24);
  if (differenceInDays > 7) {
    const weekday = date.toLocaleDateString("en-US", { weekday: "long" });
    const { formattedHour, minute, amPm } = getTimes(date);
    return `${weekday} at ${formattedHour}:${minute} ${amPm}`;
  } else {
    const month = date.toLocaleDateString("en-US", { month: "long" });
    const day = date.getDate();
    const { formattedHour, minute, amPm } = getTimes(date);
    return `${month} ${day} at ${formattedHour}:${minute} ${amPm}`;
  }
};
