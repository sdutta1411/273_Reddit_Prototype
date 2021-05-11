/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable react/jsx-no-comment-textnodes */
import React from 'react';
import {Link} from "react-router-dom";
import image from "../../images/Reddit.png";
import "./ModerationPage.css";
export default function ModerationPage(){
    const menus = [
        { to: "/popular", text: "Popular" },
        { to: "/all", text: "All" },
        { to: "/random", text: "Random" },
      ];
    
      const subreddits = [
        "askreddit",
        "worldnews",
        "videos",
        "funny",
        "todayileaned",
        "pics",
        "gaming",
        'movies',
        'news', 
        'gifs',
        'aww',
        'mildlyinteresting',
        'showerthoughts',
        'televison',
        'jokes',
        'science',
        'soccer',
        'internetisbeautiful',
        'dataisbeautiful',
        'askscience'
      ];
        return(
            <div className="CommunityModerator">
                <div className="CommunityModerator_logo">
                    // eslint-disable-next-line jsx-a11y/img-redundant-alt
                    <img src = {image} alt="this is reddit image"/>
                </div>
             <div className="CommunityModerator_search">
                 <input type="text" name="search" placeholder="Search"/>
            </div>
            
            <div className="CommunityModerator__link">
        <ul className="CommunityModerator__menu">
          {menus.map((menu) => (
            <li>
              <Link to={menu.to}>{menu.text}</Link>
            </li>
          ))}
        </ul>
        <hr />
        <ul className="CommunityModerator__subreddit">
          {subreddits.map(subreddit => (
              <li><Link to={`/r/${subreddit}`}>{subreddit}</Link></li>
          ))}
        </ul>
      </div>
            </div>
        );
    
}

