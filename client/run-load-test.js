#!/usr/bin/env node

const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Starting Load Testing for 10,000 Concurrent Users Support');
console.log('==========================================================\n');

// Check if Artillery is installed
function checkArtillery() {
  return new Promise((resolve, reject) => {
    exec('artillery --version', (error, stdout, stderr) => {
      if (error) {
        console.log('❌ Artillery not found. Installing...');
        exec('npm install -g artillery', (installError) => {
          if (installError) {
            reject('Failed to install Artillery');
          } else {
            resolve();
          }
        });
      } else {
        console.log('✅ Artillery found:', stdout.trim());
        resolve();
      }
    });
  });
}

// Run load test
function runLoadTest() {
  return new Promise((resolve, reject) => {
    const configFile = path.join(__dirname, 'load-testing.yml');
    
    if (!fs.existsSync(configFile)) {
      reject('Load testing configuration file not found');
      return;
    }

    console.log('📊 Running load test...');
    console.log('This will simulate up to 10,000 concurrent users');
    console.log('Test duration: ~12 minutes\n');

    const testProcess = exec(`artillery run ${configFile}`, (error, stdout, stderr) => {
      if (error) {
        console.error('❌ Load test failed:', error);
        reject(error);
        return;
      }

      console.log('✅ Load test completed successfully!');
      console.log('\n📈 Results:');
      console.log(stdout);
      resolve(stdout);
    });

    // Real-time output
    testProcess.stdout.on('data', (data) => {
      console.log(data.toString());
    });

    testProcess.stderr.on('data', (data) => {
      console.error(data.toString());
    });
  });
}

// Analyze results
function analyzeResults(output) {
  console.log('\n🔍 Analyzing Results for SRS Compliance...\n');

  // Extract key metrics from Artillery output
  const lines = output.split('\n');
  let results = {
    requests: 0,
    errors: 0,
    p95: 0,
    p99: 0,
    avgResponseTime: 0,
    rps: 0
  };

  for (const line of lines) {
    if (line.includes('All virtual users finished')) {
      console.log('✅ All virtual users completed successfully');
    }
    if (line.includes('requests completed')) {
      const match = line.match(/(\d+) requests completed/);
      if (match) results.requests = parseInt(match[1]);
    }
    if (line.includes('errors')) {
      const match = line.match(/(\d+) errors/);
      if (match) results.errors = parseInt(match[1]);
    }
    if (line.includes('p95')) {
      const match = line.match(/p95: (\d+)/);
      if (match) results.p95 = parseInt(match[1]);
    }
    if (line.includes('p99')) {
      const match = line.match(/p99: (\d+)/);
      if (match) results.p99 = parseInt(match[1]);
    }
    if (line.includes('mean')) {
      const match = line.match(/mean: (\d+)/);
      if (match) results.avgResponseTime = parseInt(match[1]);
    }
    if (line.includes('rps')) {
      const match = line.match(/rps: ([\d.]+)/);
      if (match) results.rps = parseFloat(match[1]);
    }
  }

  // SRS Compliance Check
  console.log('📊 SRS Compliance Analysis:');
  console.log('============================');
  
  const errorRate = results.requests > 0 ? (results.errors / results.requests) * 100 : 0;
  const p95Compliant = results.p95 <= 2000;
  const p99Compliant = results.p99 <= 5000;
  const errorRateCompliant = errorRate <= 5;

  console.log(`📈 Total Requests: ${results.requests.toLocaleString()}`);
  console.log(`❌ Errors: ${results.errors.toLocaleString()} (${errorRate.toFixed(2)}%)`);
  console.log(`⏱️  P95 Response Time: ${results.p95}ms ${p95Compliant ? '✅' : '❌'}`);
  console.log(`⏱️  P99 Response Time: ${results.p99}ms ${p99Compliant ? '✅' : '❌'}`);
  console.log(`⚡ Average Response Time: ${results.avgResponseTime}ms`);
  console.log(`🚀 Requests per Second: ${results.rps.toFixed(2)}`);

  console.log('\n🎯 SRS Requirements Check:');
  console.log('==========================');
  console.log(`✅ Error Rate ≤ 5%: ${errorRateCompliant ? 'PASS' : 'FAIL'} (${errorRate.toFixed(2)}%)`);
  console.log(`✅ P95 Response Time ≤ 2s: ${p95Compliant ? 'PASS' : 'FAIL'} (${results.p95}ms)`);
  console.log(`✅ P99 Response Time ≤ 5s: ${p99Compliant ? 'PASS' : 'FAIL'} (${results.p99}ms)`);

  const overallCompliant = p95Compliant && p99Compliant && errorRateCompliant;
  
  console.log('\n🏆 Overall SRS Compliance:');
  console.log('==========================');
  if (overallCompliant) {
    console.log('🎉 SUCCESS: Application meets SRS requirements for 10,000 concurrent users!');
    console.log('✅ Ready for production deployment');
  } else {
    console.log('⚠️  WARNING: Application does not fully meet SRS requirements');
    console.log('🔧 Recommendations:');
    if (!p95Compliant) console.log('   - Optimize response times for 95% of requests');
    if (!p99Compliant) console.log('   - Improve performance for peak load scenarios');
    if (!errorRateCompliant) console.log('   - Reduce error rate through better error handling');
  }

  return {
    compliant: overallCompliant,
    results,
    recommendations: []
  };
}

// Generate report
function generateReport(analysis) {
  const report = {
    timestamp: new Date().toISOString(),
    srsRequirement: '10,000 concurrent users support',
    testResults: analysis.results,
    compliance: analysis.compliant,
    recommendations: analysis.recommendations
  };

  const reportFile = path.join(__dirname, `load-test-report-${new Date().toISOString().split('T')[0]}.json`);
  fs.writeFileSync(reportFile, JSON.stringify(report, null, 2));
  
  console.log(`\n📄 Detailed report saved to: ${reportFile}`);
  return reportFile;
}

// Main execution
async function main() {
  try {
    await checkArtillery();
    const output = await runLoadTest();
    const analysis = analyzeResults(output);
    const reportFile = generateReport(analysis);
    
    console.log('\n🎯 Next Steps:');
    console.log('==============');
    if (analysis.compliant) {
      console.log('1. ✅ Document SRS compliance in your project');
      console.log('2. 📊 Monitor performance in production');
      console.log('3. 🔄 Run regular load tests');
    } else {
      console.log('1. 🔧 Implement performance optimizations');
      console.log('2. 📈 Consider scaling infrastructure');
      console.log('3. 🔄 Re-run load tests after optimizations');
    }
    
  } catch (error) {
    console.error('❌ Load testing failed:', error);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = { runLoadTest, analyzeResults, generateReport }; 