import Mock from 'mockjs';

Mock.setup({
  timeout: 10
});

Mock.mock('/login', 'post', req => {
  const { password, username } = JSON.parse(req.body);
  return { success: true, token: 'abc', username };
});

Mock.mock('/register', 'post', req => {
  const { password, username } = JSON.parse(req.body);
  return { success: true };
});

// 病例
Mock.mock('/getCase', {
  'list|8': [
    {
      'id|+1': 1,
      createTime: '@now',
      title: '@cword(5)'
    }
  ]
});
// delete
Mock.mock(/\/delete/, 'delete', req => ({ success: true }));

Mock.mock('/getQuestion', {
  'list|8': [
    {
      'id|+1': 1,
      createTime: '@now',
      title: '@cword(5)'
    }
  ]
});
