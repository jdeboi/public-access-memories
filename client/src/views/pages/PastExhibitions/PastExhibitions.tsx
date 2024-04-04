import React from "react";
import "../Page.css";
import "../Artists/Artists.css";

export const HomeBody = () => {
  return (
    <div className="Artists Statement Page">
      <div className="container">
        <h1>Past Exhibitions</h1>
        <br />
        <br />
        <br />
        <br />
        <div className="artists-list">
          <div className="artist-box windows">
            <a href="/pastexhibitions/fieldsofview">
              <img
                className="thumb"
                src="https://jdeboi-public.s3.us-east-2.amazonaws.com/public_access_memories/fields_of_view/fieldsofview.jpg"
              />
            </a>
            <div className="artist-name">
              <a href="/pastexhibitions/fieldsofview">Fields of View</a>
            </div>
          </div>
          <div className="artist-box windows">
            <a href="/pastexhibitions/asirecall">
              <img
                className="thumb"
                src="https://jdeboi-public.s3.us-east-2.amazonaws.com/public_access_memories/as_i_recall/thumbs/gallery_thumb.jpg"
              />
            </a>
            <div className="artist-name">
              <a href="/pastexhibitions/asirecall">As I Recall</a>
            </div>
          </div>
          <div className="artist-box windows">
            <a href="/pastexhibitions/homebody">
              <img
                className="thumb"
                src="https://jdeboi-public.s3.us-east-2.amazonaws.com/public_access_memories/home_body/gallery_HB_thumb.png"
              />
            </a>
            <div className="artist-name">
              <a href="/pastexhibitions/homebody">home &lt;/body&gt;</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeBody;
