import React, { Component } from 'react';
//import { makeStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import _ from 'lodash';
const data = {
  id: 'root',
  name: 'NCMS',
  children: [
    {
      id: '1',
      name: '분석',
    },
    {
      id: '3',
      name: '측정',
      children: [
        {
          id: '4',
          name: 'Child - 4',
        },
      ],
    },
  ],
};

// const useStyles = makeStyles({
//   root: {
//     height: 110,
//     flexGrow: 1,
//     maxWidth: 400,
//   },
// });

export default class RecursiveTreeView extends Component {
  state = {
    objectArr: [],
  };

  componentDidMount() {
    const { pureComponents } = this.props;
    console.log('pureComponents', pureComponents);
    let hello = _.groupBy(pureComponents, 'category');
    let objectArr = Object.keys(hello).map((item, key) => {
      let objectCategory = hello[item];
      let cateNm = _.find(hello[item], 'category').category; // ncms ,cms
      //console.log('objectCategory ', objectCategory);
      let childrenObj = _.groupBy(objectCategory, 'pageView');
      //console.log('childrenObj ', childrenObj);
      let sub = Object.keys(childrenObj).map((item, key) => {
        //item = 장애조회, 분석
        return {
          id: item + '_' + key,
          name: item,
          children: childrenObj[item].map((item, key) => {
            let componentName = Object.keys(item)[0];
            //console.log('componentName ', componentName);
            return {
              id: item + '_' + key,
              name: componentName,
            };
          }),
        };
      });
      return {
        id: item + '_' + key,
        name: cateNm,
        children: sub,
      };
    });

    //console.log(objectArr);
    this.setState({
      objectArr: objectArr,
    });
  }
  renderTree = nodes => (
    <TreeItem key={nodes.id} nodeId={nodes.name} label={nodes.name} onClick={() => this.props.handleSelect(nodes.name)}>
      {Array.isArray(nodes.children) ? nodes.children.map(node => this.renderTree(node)) : null}
    </TreeItem>
  );
  render() {
    if (_.isEmpty(this.state.objectArr)) {
      console.log('hell');
      return null;
    }
    console.log();
    //const { data } = this.state;
    return (
      <TreeView className="root-tree-view" defaultCollapseIcon={<ExpandMoreIcon />} defaultExpanded={['root']} defaultExpandIcon={<ChevronRightIcon />}>
        {this.renderTree(this.state.objectArr[0])}
      </TreeView>
    );
  }
}
