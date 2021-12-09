import React from 'react';
import {Link} from 'react-router-dom';

class ListItem extends React.PureComponent {

  // constructor(props) {
  //   super(props);
  // }

  render() {
    const {title, link, ui, callback, classN} = this.props;
    const shortcut = getShortcut(this.props.shortcut, ui.width);
    // let classn = (shortcut === '' || shortcut === null || ui.isMobile) ? 'noShortcut': 'shortcut';
    let classn = classN;
    classn += (shortcut === '' || shortcut === null) ? ' noShortcut': ' shortcut';

    if (title === "thesis") {
      return (
        <li className={classn}><a href={"https://lmd-bucket.s3.us-east-2.amazonaws.com/thesis.pdf"} target="_blank" rel="noopener noreferrer">thesis</a></li>
      )
    }
    else if (link && link !== '') {
      return (
          <li className={classn}><Link to={link}>{this.getMenuItem(title, shortcut)}</Link></li>
      );
    }

    return (
      <li className={classn} onClick={callback} shortcut={shortcut}>{title}</li>
    );
  }

  getMenuItem = (title,shortcut) => {
    return (
      <div className="flexRow">
        <div className="title flex1">{title}</div>
        <div className="shortcut">{shortcut}</div>
      </div>
    )
  }
}

function getShortcut(shortcut, width) {
  // if (shortcut === null || shortcut === "" || width < 500) return null;
  if (shortcut === null || shortcut === "") 
    return null;

  const parser = new DOMParser();
  const parsedString = parser.parseFromString(shortcut, 'text/html');
  return parsedString.body.innerHTML;
}

export default ListItem
