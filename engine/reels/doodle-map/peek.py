import json,sys,subprocess
# python3 peek.py clip n  → probe/<clip>.jpg, n frames evenly over the clip
c=sys.argv[1]; n=int(sys.argv[2]) if len(sys.argv)>2 else 6
d=json.load(open(f'clips/{c}/clip.json')); fr=d['frames']
ts=[d['dur']*(i+.5)/n for i in range(n)]
fs=[f"clips/{c}/"+min(fr,key=lambda f:abs(f['t']-t))['f'] for t in ts]
print(c, round(d['dur'],2), [round(t,1) for t in ts]); print(d['taps'])
subprocess.run(['./sheet.sh',f'probe/{c}.jpg',*fs])
