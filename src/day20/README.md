eszpee@eszpees-2020-MacBook-Air day20 % npm test

> test
> tsc && jest

 PASS  ./test.js
  Helpers
    ✓ deepCopy (1 ms)
    ✓ bin2dec
    ✓ dot2bin
  cropImage
    ✓ Nothing to crop
    ✓ Crop top and bottom only
    ✓ Crop left only (1 ms)
    ✓ Crop right only
    ✓ Complex crop
  enhance
    ✓ Sample from task
    ✓ Second sample from task (1 ms)
  litPixels
    ✓ Simple test
  Complete sample test
    ✓ First part

Test Suites: 1 passed, 1 total
Tests:       12 passed, 12 total
Snapshots:   0 total
Time:        0.176 s, estimated 1 s
Ran all test suites.
eszpee@eszpees-2020-MacBook-Air day20 % npm start

> start
> tsc && node index.js

Number of pixels lit after 50 enhancements: 18269
eszpee@eszpees-2020-MacBook-Air day20 % 