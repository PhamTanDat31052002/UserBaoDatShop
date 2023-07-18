import React, { useEffect } from "react";
import Header from "../Components/Header";
import ChangePassCRUD from "../Components/ChangePassCRUD";
import PageContainer from "./ten";
export default function ChangePass()
{
    return(
        <>
         <PageContainer title="Đổi mật khẩu" description="this is Sample page">
         <Header/>
        <ChangePassCRUD/>
         </PageContainer>
       
        </>
    )
}