import Hero from '../Hero';

export default function HeroExample() {
  return (
    <Hero onScrollToForm={() => console.log('Scroll to form triggered')} />
  );
}
