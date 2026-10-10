async function verify() {
  console.log('--- Checking HTTP Endpoints ---');
  
  // 1. Manifest
  const manifestRes = await fetch('http://localhost:3000/manifest.json');
  console.log('manifest.json status:', manifestRes.status);
  const manifestData = await manifestRes.json();
  console.log('manifest name:', manifestData.name);

  // 2. Icon
  const iconRes = await fetch('http://localhost:3000/icon.svg');
  console.log('icon.svg status:', iconRes.status);

  // 3. Homepage HTML
  const homeRes = await fetch('http://localhost:3000/');
  console.log('homepage status:', homeRes.status);
  const html = await homeRes.text();

  const checks = [
    ['OCC Badge', html.includes('OCC')],
    ['City Scenario Title', html.includes('City Scenario')],
    ['IPL Scenario', html.includes('IPL Match')],
    ['GPSC Scenario', html.includes('GPSC Civil Services')],
    ['Navigation Dock Tabs', html.includes('Events') && html.includes('Board') && html.includes('Broadcast')],
    ['Dynamic Island on sm+', html.includes('hidden sm:block')],
  ];

  console.log('\n--- Content Verification ---');
  let allPassed = true;
  for (const [name, passed] of checks) {
    console.log(`${passed ? '✓' : '✗'} ${name}: ${passed ? 'FOUND' : 'MISSING'}`);
    if (!passed) allPassed = false;
  }

  // Check if root shell has opacity:0
  const hasShellOpacity0 = html.includes('device-shell relative" style="width:min(393px, 100vw);height:min(852px, 100dvh);opacity:0');
  console.log(`Device shell opacity:0 blocker removed: ${!hasShellOpacity0 ? 'YES (FIXED)' : 'NO'}`);

  console.log('\nResult:', allPassed && !hasShellOpacity0 ? 'ALL VERIFICATIONS PASSED!' : 'SOME FAILED');
}

verify().catch(console.error);
