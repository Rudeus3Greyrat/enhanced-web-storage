# enhanced-web-storage
A enhanced web storage with env support, expire time control,  change callback and LRU storage clear strategy.

<p align="center">
  <a href="https://www.npmjs.com/package/awesome-video-player"><img src="https://img.shields.io/npm/v/awesome-video-player.svg?sanitize=true" alt="Version"></a>
  <a href="https://www.npmjs.com/package/awesome-video-player"><img src="https://img.shields.io/npm/l/awesome-video-player.svg?sanitize=true" alt="License"></a>
  <br>
</p>

## How to Start
```javascript
import CustomStorage from 'enhanced-web-storage'
// obtain a CustomStorage instance
const storage = new CustomStorage()
// set instance bootStrap config
storage.bootStrap({
  // web storage mode, support local or session
  mode:'local',
  // expired time in milliseconds
  timeout:5000
})
```

## Methods on instance

| Name       | Param                                                        | Return    | Desc                                        |
| ---------- | ------------------------------------------------------------ | --------- | ------------------------------------------- |
| setItem    | @param key  <br />@param value                               | undefined | Set given value to given key                |
| getItem    | string                                                       | any       | Return value of key in storage if any       |
| removeItem | string                                                       | undefined | Remove key value pair from storage          |
| changeItem | @param key  <br />@param callback <br />@param default value | undefined | Change value of given key based on callback |
| getKeys    | null                                                         | string [] | Obtain all stored keys                      |
| getValues  | null                                                         | any []    | Obtain all stored values                    |
| size       | null                                                         | number    | Obtain size of currently used storage       |
| hasItem    | string                                                       | boolean   | Check If given key is stored or not         |
| clearAll   | null                                                         | undefined | Clear all storage                           |

