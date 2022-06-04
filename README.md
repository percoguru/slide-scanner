## To Start the API server run 
```
npm start
```

## To Start the Processor 
```
npm run process
```

## APIs
- GET `/location`
  - Gets a list of locations the user moved to in order of the user input along with the state at each node
- POST `/key-storke`
  - Adds a movement to the camera's path
  - body 
    ```
    {
      "direction": "down" | "up" | "left" | "right"
    } 
    ``` 