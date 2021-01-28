import React from 'react';

import convertDate from "../../utils/converDate"
import './index.css'

function urlify(text) {
    var urlRegex = /(https?:\/\/[^\s]+)/g;
    return (
        text.replace(urlRegex, function (url) {
            return (<a href={`${url}`}>{url}</a>);
        })
    )
    // return 
    // or alternatively
    // return text.replace(urlRegex, '<a href="$1">$1</a>')
}
function renderText(text) {
    const re = /(https?:\/\/[^\s]+)/g;
    let parts = text.split(re) // re is a matching regular expression
    for (let i = 1; i < parts.length; i += 2) {
        parts[i] = <a key={'link' + i} href={parts[i]}>{parts[i]}</a>
    }
    return parts
}


function Message({ message }) {
    let text = renderText(message.content);
    return (
        <div className="message">
            <div className="message--user">{message.user} <span className="message--time">{convertDate(message.datetime)}</span></div>
            <div className="message--content">{text}</div>
        </div>
    )
}

export default Message;