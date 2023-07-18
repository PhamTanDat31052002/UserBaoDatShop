import React from "react";
import HomeCRUD from "../Components/HomeCRUD";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import queryString from 'query-string';
import PageContainer from "./ten";
export default function Home() {
    return (
        <>
          <PageContainer title="Trang Chủ" description="this is Sample page">
            <Header />
            <HomeCRUD />
            <Footer />
            </PageContainer>
        </>

    )
}