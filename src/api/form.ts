const userData = {
    id: 1,
    name: "Aman Singh",
    dob:"17/01/2001",
    something: "Something"
}
export async function updateFormContent(id:number, jsonContent: string){
    const user = await userData;

    const mySavingData ={
        userId : user.id,
        id: id,
        data:{
            content:jsonContent
        }
    };

    return mySavingData;
}