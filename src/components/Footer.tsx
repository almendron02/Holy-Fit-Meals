import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="w-full border-t border-outline-variant/20 bg-surface-container-low">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 max-w-7xl mx-auto px-8 py-16">
        <div className="col-span-1 md:col-span-1">
          <div className="text-xl font-bold text-on-surface font-headline mb-6">Holy Fit Meals</div>
          <p className="text-on-surface-variant font-body text-sm leading-relaxed mb-6">
            Delivering authentic, macro-balanced meals across Miami-Dade. Family-owned and deeply rooted in our Cuban culture.
          </p>
          <div className="flex gap-4">
            <span className="material-symbols-outlined text-primary cursor-pointer">social_leaderboard</span>
            <span className="material-symbols-outlined text-primary cursor-pointer">photo_camera</span>
          </div>
        </div>
        <div>
          <h4 className="font-bold font-headline mb-6">Company</h4>
          <div className="flex flex-col space-y-4">
            <Link className="text-on-surface-variant font-body text-sm hover:text-primary transition-colors" to="/">Home</Link>
            <Link className="text-on-surface-variant font-body text-sm hover:text-primary transition-colors" to="/menu">Menu</Link>
            <Link className="text-on-surface-variant font-body text-sm hover:text-primary transition-colors" to="/our-story">Our Story</Link>
          </div>
        </div>
        <div>
          <h4 className="font-bold font-headline mb-6">Support</h4>
          <div className="flex flex-col space-y-4">
            <a className="text-on-surface-variant font-body text-sm hover:text-primary transition-colors" href="#">Contact</a>
            <a className="text-on-surface-variant font-body text-sm hover:text-primary transition-colors" href="#">Privacy Policy</a>
            <a className="text-on-surface-variant font-body text-sm hover:text-primary transition-colors" href="#">FAQs</a>
          </div>
        </div>
        <div>
          <h4 className="font-bold font-headline mb-6">Location</h4>
          <p className="text-on-surface-variant font-body text-sm leading-relaxed">
            Miami HQ - Little Havana<br />
            Miami, FL 33135<br /><br />
            hello@holyfitmeals.com
          </p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-8 py-8 border-t border-outline-variant/20 text-center">
        <p className="text-on-surface-variant font-body text-sm">© 2024 Holy Fit Meals. Miami HQ. Family Owned & Operated.</p>
      </div>
    </footer>
  );
}
