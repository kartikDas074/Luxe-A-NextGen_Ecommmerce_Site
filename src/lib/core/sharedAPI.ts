
export const postMethod = async (path: string, data: any) => {
  const result = await fetch(`${process.env.SERVER_URL}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return await result.json();
};


export const getMethod=async(path: string)=>{
    const result=await fetch(`${process.env.SERVER_URL}${path}`);
    return await result.json();
}