const BASEURL = 'http://192.168.1.36:3000/api';
const TOKEN = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlNoaXZhbnNodSIsImlhdCI6MTczMjE2NTMzOX0.YDu6P4alpQB5QL-74z1jO4LGfEwZA_n_Y29o512FrM8';
export const getPoojaCategoryName = async () => {
    try {
        const response = await fetch(
            `${BASEURL}'/pooja/category/${id}'`,
            {
                method: 'GET',
                headers: {
                    'Authorization': TOKEN,
                    'Content-Type': 'application/json'
                }
            }
        );
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        return data; 
    } catch (error) {
        console.error("Error fetching category:", error);
        return null;
    }
};

export const  getBhajanCategoryName = async() => {

}

export const getEStoreCategoryName = async() => {
    
}