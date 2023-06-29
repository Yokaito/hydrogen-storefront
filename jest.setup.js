import {jestPreviewConfigure} from 'jest-preview';
import '@testing-library/jest-dom';
require('jest-fetch-mock').enableMocks();
import {TextDecoder, TextEncoder} from 'util';

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

jestPreviewConfigure({
  // Enable autoPreview so Jest Preview runs automatically
  // whenever your test fails, without you having to do anything!
  autoPreview: true,
});
