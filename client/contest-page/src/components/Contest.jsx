import React from "react";
import Card from "./Card"
function Contest(){
    return(
        <div>
            <div className="jumbotron my-jumbotron" style={{padding:"4rem 2rem"}}>
            <h2 className="card-name" style={{marginLeft: "3%"}}>Live Now :</h2>
            <div className="row">
            <Card></Card>
            <Card></Card>
            <Card></Card>
            <Card></Card>
            <Card></Card>
            <Card></Card>
            </div>
            </div>
        </div>
    );
}
export default Contest;