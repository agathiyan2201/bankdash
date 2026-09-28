import { useEffect, useRef, useState } from 'react';
import { useUser } from '../context/UserContext';
import { AnimatePresence, motion } from 'framer-motion';
import useFetch from '../hooks/useFetch';
import { getUser, updateUser } from '../services/api';
import Avatar from '../components/ui/Avatar';
import Icon from '../components/ui/Icon';
import { ErrorState, Skeleton } from '../components/ui/States';

const tabs = ['Edit Profile', 'Preferences', 'Security'];

const profileFields = [
  ['name', 'Your Name'], ['username', 'User Name'], ['email', 'Email', 'email'], ['password', 'Password', 'password'],
  ['dob', 'Date of Birth', 'date'],
  ['presentAddress', 'Present Address'], ['permanentAddress', 'Permanent Address'],
  ['city', 'City'], ['postalCode', 'Postal Code'], ['country', 'Country'],
];

function Toggle({ checked, onChange, label }) {
  return (
    <label className="flex cursor-pointer items-center gap-4">
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative h-7 w-12 shrink-0 rounded-full transition-colors ${checked ? 'bg-[#16DBCC]' : 'bg-brand-border'}`}
      >
        <motion.span layout className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow ${checked ? 'right-1' : 'left-1'}`} />
      </button>
      <span className="text-sm text-brand-ink">{label}</span>
    </label>
  );
}

function SaveButton({ state }) {
  return (
    <div className="flex items-center justify-end gap-4">
      <AnimatePresence>
        {state === 'saved' && (
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-sm text-brand-green">
            Changes saved.
          </motion.span>
        )}
      </AnimatePresence>
      <button type="submit" disabled={state === 'saving'} className="btn-primary w-full md:w-[190px]">
        {state === 'saving' ? 'Saving…' : 'Save'}
      </button>
    </div>
  );
}

export default function Settings() {
  const { data, loading, error, reload } = useFetch(getUser);
  const [tab, setTab] = useState(0);
  const [profile, setProfile] = useState(null);
  const [prefs, setPrefs] = useState({ currency: 'USD', timezone: '(GMT-12:00) International Date Line West', digital: true, merchant: false, recommend: true });
  const [security, setSecurity] = useState({ twoFactor: true, current: '', next: '' });
  const [save, setSave] = useState('idle');
  const { avatar, setAvatar, isDefaultAvatar } = useUser();
  const fileInput = useRef(null);
  const [photoError, setPhotoError] = useState('');

  const onPhoto = (e) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    if (!file.type.startsWith('image/')) return setPhotoError('Choose an image file (JPG, PNG or WebP).');
    if (file.size > 2 * 1024 * 1024) return setPhotoError('Choose an image smaller than 2 MB.');
    const reader = new FileReader();
    reader.onload = () => { setAvatar(reader.result); setPhotoError(''); };
    reader.onerror = () => setPhotoError('That image could not be read. Try another file.');
    reader.readAsDataURL(file);
  };

  useEffect(() => { if (data) setProfile(data); }, [data]);

  const submit = async (e) => {
    e.preventDefault();
    setSave('saving');
    await updateUser(profile);
    setSave('saved');
    setTimeout(() => setSave('idle'), 2000);
  };

  if (error) return <ErrorState message={error} onRetry={reload} />;
  if (loading || !profile) return <Skeleton className="h-[600px]" />;

  return (
    <div className="panel !p-6 md:!p-8">
      <div role="tablist" className="mb-8 flex gap-6 overflow-x-auto border-b border-[#F4F5F7] md:gap-14">
        {tabs.map((t, i) => (
          <button
            key={t}
            role="tab"
            aria-selected={tab === i}
            onClick={() => { setTab(i); setSave('idle'); }}
            className={`relative shrink-0 pb-3 text-sm font-medium md:text-base ${tab === i ? 'text-brand-blue' : 'text-brand-muted hover:text-brand-navy'}`}
          >
            {t}
            {tab === i && <motion.span layoutId="settings-tab" className="absolute inset-x-0 -bottom-px h-[3px] rounded-t bg-brand-blue" />}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.form key={tab} onSubmit={submit} initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }} transition={{ duration: 0.18 }} className="space-y-8">
          {tab === 0 && (
            <div className="flex flex-col gap-8 md:flex-row">
              <div className="flex flex-col items-center gap-2 self-center md:self-start">
                <div className="relative">
                  <Avatar name={profile.name} src={avatar} size="h-[90px] w-[90px] text-2xl" />
                  <button
                    type="button"
                    onClick={() => fileInput.current?.click()}
                    aria-label="Change profile photo"
                    className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full bg-brand-blue text-white transition hover:scale-110"
                  >
                    <Icon name="pencil" className="h-4 w-4" />
                  </button>
                  <input ref={fileInput} type="file" accept="image/*" onChange={onPhoto} className="hidden" />
                </div>
                {!isDefaultAvatar && (
                  <button type="button" onClick={() => setAvatar(null)} className="text-xs text-brand-muted hover:text-brand-red">
                    Remove photo
                  </button>
                )}
                {photoError && <p className="max-w-[140px] text-center text-xs text-brand-red">{photoError}</p>}
              </div>
              <div className="grid flex-1 gap-5 md:grid-cols-2">
                {profileFields.map(([key, label, type = 'text']) => (
                  <label key={key} className="block text-sm text-brand-ink">
                    {label}
                    <input type={type} value={profile[key]} onChange={(e) => setProfile({ ...profile, [key]: e.target.value })} className="input mt-2" />
                  </label>
                ))}
              </div>
            </div>
          )}

          {tab === 1 && (
            <>
              <div className="grid gap-5 md:grid-cols-2">
                <label className="block text-sm text-brand-ink">
                  Currency
                  <select value={prefs.currency} onChange={(e) => setPrefs({ ...prefs, currency: e.target.value })} className="input mt-2">
                    <option>USD</option><option>INR</option><option>EUR</option>
                  </select>
                </label>
                <label className="block text-sm text-brand-ink">
                  Time Zone
                  <input value={prefs.timezone} onChange={(e) => setPrefs({ ...prefs, timezone: e.target.value })} className="input mt-2" />
                </label>
              </div>
              <fieldset className="space-y-4">
                <legend className="mb-4 text-base font-medium text-brand-navy">Notification</legend>
                <Toggle checked={prefs.digital} onChange={(v) => setPrefs({ ...prefs, digital: v })} label="I send or receive digital currency" />
                <Toggle checked={prefs.merchant} onChange={(v) => setPrefs({ ...prefs, merchant: v })} label="I receive merchant order" />
                <Toggle checked={prefs.recommend} onChange={(v) => setPrefs({ ...prefs, recommend: v })} label="There are recommendations for my account" />
              </fieldset>
            </>
          )}

          {tab === 2 && (
            <>
              <fieldset className="space-y-4">
                <legend className="mb-4 text-base font-medium text-brand-navy">Two-factor Authentication</legend>
                <Toggle checked={security.twoFactor} onChange={(v) => setSecurity({ ...security, twoFactor: v })} label="Enable or disable two factor authentication" />
              </fieldset>
              <fieldset className="max-w-md space-y-5">
                <legend className="mb-4 text-base font-medium text-brand-navy">Change Password</legend>
                <label className="block text-sm text-brand-ink">
                  Current Password
                  <input type="password" autoComplete="current-password" value={security.current} onChange={(e) => setSecurity({ ...security, current: e.target.value })} className="input mt-2" />
                </label>
                <label className="block text-sm text-brand-ink">
                  New Password
                  <input type="password" autoComplete="new-password" value={security.next} onChange={(e) => setSecurity({ ...security, next: e.target.value })} className="input mt-2" />
                </label>
              </fieldset>
            </>
          )}

          <SaveButton state={save} />
        </motion.form>
      </AnimatePresence>
    </div>
  );
}
