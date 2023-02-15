import { mount } from '@vue/test-utils';
import HelloWorld from '/@/App.vue';

test('displays message', async () => {
  const wrapper = await mount(HelloWorld);
  // Assert the rendered text of the component
});
