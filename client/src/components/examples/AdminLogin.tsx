import AdminLogin from '../AdminLogin';

export default function AdminLoginExample() {
  return (
    <AdminLogin 
      onLogin={(username, password) => {
        console.log('Login attempt:', { username, password });
        if (username === 'admin' && password === '1234') {
          alert('로그인 성공!');
        } else {
          alert('로그인 실패!');
        }
      }} 
    />
  );
}
