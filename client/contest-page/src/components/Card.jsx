import React from "react";
function Card(){
    return(
        <div class="col-lg-4 col-md-6 col-sm-6 mb-5 mt-5">
            <center>
            <div className="my-card">
            <div className="card-body">
            <p style={{font :"size 16"}} className="card-name">CodeZap 
            <img src="imgs/user.png" className="card_img"/><span className="contestant_count"> 45</span>
            </p>
            <p className="card-description">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quae amet fuga, accusantium deserunt minima magni dignissimos assumenda magnam distinctio delectus recusandae, accusamus sequi eaque at nihil aliquid illum velit nobis.</p>
            <button  style={{marginLeft: '12px'}} className="my-2 my-sm-0 join_button" id="join"  type="submit">Join</button> <br></br>
            </div>
            </div>
            </center>
            </div>
    );
}
export default Card;