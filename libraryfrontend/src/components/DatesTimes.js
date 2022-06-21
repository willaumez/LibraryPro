
export function CurrentDate() {
  const current = new Date();
  const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;

  return (date
  );
}

export function LimitDate() {
      const currentDate = new Date();
      currentDate.setDate(currentDate.getDate()+7)
      const limit = `${currentDate.getDate()}/${currentDate.getMonth()+1}/${currentDate.getFullYear()}`;
  return (limit
  );
}