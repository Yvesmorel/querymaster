import { useState } from 'react';
import React from 'react';
import { Space, Table, Tag } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExpand } from '@fortawesome/free-solid-svg-icons';
const TABLE = ({ columns, data,width,height }) => {
    const [yScroll, setYScroll] = useState(false);
    const [xScroll, setXScroll] = useState();
    const scroll = {y:240,x:'100vw'};
    // if (yScroll) {
    //   scroll.y = 240;
    // }
    // if (xScroll) {
    //   scroll.x = '100vw';
    // }
    return (<Table size='large'  expandable={{defaultExpandAllRows:true}} bordered={false}  style={{width:width,overflowX:'auto',overflowY:'auto',height:height,boxShadow: "0px 12px 26px 0px rgba(16, 30, 115, 0.06)",borderRadius:'10px'}} columns={columns} dataSource={data} />);
};
export default TABLE;