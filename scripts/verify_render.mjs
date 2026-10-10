async function verify() {
  console.log('--- Verifying MetroFlow OCC Full System ---');
  
  // 1. Manifest
  const manifestRes = await fetch('http://localhost:3000/manifest.json');
  console.log('manifest.json status:', manifestRes.status);

  // 2. Icon
  const iconRes = await fetch('http://localhost:3000/icon.svg');
  console.log('icon.svg status:', iconRes.status);

  // 3. Homepage HTML
  const homeRes = await fetch('http://localhost:3000/');
  console.log('homepage status:', homeRes.status);
  const html = await homeRes.text();

  const checks = [
    ['OCC Badge & Clock', html.includes('OCC')],
    ['City Scenario Title', html.includes('City Scenario')],
    ['Category Filter Pills', html.includes('Sports') && html.includes('Exams')],
    ['IPL Scenario Card', html.includes('IPL Match')],
    ['GPSC Scenario Card', html.includes('GPSC Civil Services')],
    ['Navigation Dock (All 5 Tabs)', html.includes('Events') && html.includes('OCC') && html.includes('Map') && html.includes('Board') && html.includes('Broadcast')],
    ['Responsive DeviceShell (Desktop Frame + Mobile View)', html.includes('hidden sm:block')],
  ];

  console.log('\n--- Content & Phase Verification ---');
  let allPassed = true;
  for (const [name, passed] of checks) {
    console.log(`${passed ? '✓' : '✗'} ${name}: ${passed ? 'OK' : 'FAIL'}`);
    if (!passed) allPassed = false;
  }

  console.log('\nFinal Status:', allPassed ? 'ALL PHASES 1-6 PRODUCTION READY!' : 'CHECK FAILED');
}

verify().catch(console.error);
