# Heading 1

## Heading 2

1. list 1

这是正文包含 `背景色文字` 

2. list 2

正文包含 ==高亮北京文字==

3. list 3

**加粗文字** *斜体文字* ~~删除线文字~~ ++下划线文字++

### Heading 3

* 无序号1

> 这是tips

* 无序号2

- [ ] unchecked 1
- [ ] unchecked 2

* 无序号3

- [x] checked 1
- [x] checked 2


下面是横线

---


#### Heading 4

下面是 ` html `

<html>
<table>
    <tr>
        <td>1</td>
        <td>2</td>
        <td>3</td>
    </tr>
    <tr>
        <td>a</td>
        <td>b</td>
        <td>c</td>
    </tr>
</table
</html>

##### Heading 5

[点击这里打开有道官网(https://note.youdao.com/)](https://note.youdao.com/)

![image](https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fwww.shangxue.com%2Fuploads%2Fstorecourse%2F20181220%2F1545285603.jpg&refer=http%3A%2F%2Fwww.shangxue.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1650647739&t=fa60ab9d3a13e1c109d23f6298ae37e7)

![有道的图标](https://note.youdao.com/favicon.ico)

##### Heading 6


```javascript
/**
 * Description :
 * Created on : 2022/1/1
 * Author : Victor Huang
 */

import React, {FC} from 'react';
import {View, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';

import log from '../../utils/Logger';

export type Props = {};

const Tutorial: FC<Props> = () => {
  const appState = useSelector(state => state);

  log.debug('11111');
  log.debug('Tutorial() > appState:', appState);
  return <View style={styles.root} />;
};

const styles = StyleSheet.create({
  root: {
    borderColor: '#0000ff',
  },
});

export default Tutorial;
```


header 1 | header 2
---|---
row 1 col 1 | row 1 col 2
row 2 col 1 | row 2 col 2


```math
E = mc^2
```


```
graph LR
A-->B
```


```
sequenceDiagram
A->>B: How are you?
B->>A: Great!
```


```
gantt
dateFormat YYYY-MM-DD
section S1
T1: 2014-01-01, 9d
section S2
T2: 2014-01-11, 9d
section S3
T3: 2014-01-02, 9d
```


