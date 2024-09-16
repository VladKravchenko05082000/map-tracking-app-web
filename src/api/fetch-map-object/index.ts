export const fetchMapObject = async (idForFetch: number) => {
  try {
    const res = await fetch(`http://localhost:3001/objects?id=${idForFetch}`);

    if (!res.ok) {
      const errorMessage = await res.json();
      throw new Error(errorMessage.message);
    } else {
      return await res.json();
    }
  } catch (e: any) {
    throw new Error(e.message);
  }
};
