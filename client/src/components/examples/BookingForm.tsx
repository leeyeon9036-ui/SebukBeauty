import BookingForm from '../BookingForm';

export default function BookingFormExample() {
  return (
    <BookingForm 
      onSubmit={(data) => {
        console.log('Booking submitted:', Object.fromEntries(data.entries()));
        alert('예약이 접수되었습니다!');
      }} 
    />
  );
}
