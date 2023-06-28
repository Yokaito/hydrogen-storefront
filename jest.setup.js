import {jestPreviewConfigure} from 'jest-preview';
require('jest-fetch-mock').enableMocks();

jestPreviewConfigure({
  // Enable autoPreview so Jest Preview runs automatically
  // whenever your test fails, without you having to do anything!
  autoPreview: true,
});
