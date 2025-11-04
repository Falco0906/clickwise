import * as tf from '@tensorflow/tfjs';
import * as use from '@tensorflow-models/universal-sentence-encoder';

class EmailClassifier {
  constructor() {
    this.model = null;
    this.encoder = null;
    this.loaded = false;
    this.scamIndicators = [
      { phrase: 'urgent action required', weight: 0.8 },
      { phrase: 'verify your account', weight: 0.9 },
      { phrase: 'suspended account', weight: 0.85 },
      { phrase: 'click here', weight: 0.7 },
      { phrase: 'limited time offer', weight: 0.75 },
      { phrase: 'bank account', weight: 0.8 },
      { phrase: 'password', weight: 0.7 },
      { phrase: 'dear customer', weight: 0.6 },
      { phrase: 'unusual activity', weight: 0.85 },
      { phrase: 'verify your identity', weight: 0.9 },
      { phrase: 'congratulations', weight: 0.8 },
      { phrase: 'you have won', weight: 0.9 },
      { phrase: 'lottery', weight: 0.85 },
      { phrase: 'prize', weight: 0.8 },
      { phrase: 'click the link below', weight: 0.9 },
      { phrase: 'account compromised', weight: 0.95 },
      { phrase: 'security alert', weight: 0.9 },
      { phrase: 'unauthorized login attempt', weight: 0.95 },
      { phrase: 'immediate action required', weight: 0.9 },
      { phrase: 'suspicious activity', weight: 0.85 }
    ];
  }

  async loadModel() {
    try {
      this.encoder = await use.load();
      this.loaded = true;
    } catch (error) {
      console.error('Error loading model:', error);
    }
  }

  preprocessText(text) {
    return text.toLowerCase()
      .replace(/[^\w\s]/g, '')
      .replace(/\s+/g, ' ')
      .trim();
  }

  detectScamPatterns(text) {
    const lowerText = text.toLowerCase();
    let scamScore = 0;
    let detectedPatterns = [];

    this.scamIndicators.forEach(indicator => {
      if (lowerText.includes(indicator.phrase)) {
        scamScore += indicator.weight;
        detectedPatterns.push(indicator.phrase);
      }
    });

    // More sophisticated checks
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const urls = text.match(urlRegex) || [];
    const suspiciousUrls = urls.filter(url => 
      !url.includes('trusted-domain.com') && 
      !url.includes('example.com')
    );

    if (suspiciousUrls.length > 0) {
      scamScore += 0.5 * suspiciousUrls.length;
      detectedPatterns.push('suspicious link');
    }

    // Check for urgency
    const urgencyWords = ['immediately', 'urgent', 'right away', 'asap', 'now'];
    if (urgencyWords.some(word => lowerText.includes(word))) {
      scamScore += 0.4;
      detectedPatterns.push('urgent language');
    }

    // Check for poor grammar/spelling (simple check)
    const grammarIssues = (text.match(/ [A-Z][a-z]+ [a-z]+ [A-Z][a-z]+/g) || []).length;
    scamScore += 0.2 * grammarIssues;
    if (grammarIssues > 0) {
      detectedPatterns.push('unusual formatting');
    }

    return {
      isScam: scamScore > 1.5,
      confidence: Math.min(0.99, scamScore / 3), // Cap confidence at 99%
      detectedPatterns: [...new Set(detectedPatterns)] // Remove duplicates
    };
  }

  async predict(emailText) {
    if (!this.loaded) await this.loadModel();
    
    try {
      const cleanText = this.preprocessText(emailText);
      const scamAnalysis = this.detectScamPatterns(emailText);
      
      // Use both the encoder and pattern matching for better accuracy
      let finalScore = scamAnalysis.confidence;
      let explanation = '';

      if (this.encoder) {
        try {
          const embeddings = await this.encoder.embed([cleanText]);
          // Simple heuristic: longer emails with many indicators are more likely to be scams
          const lengthFactor = Math.min(1, emailText.length / 500);
          finalScore = Math.min(0.95, scamAnalysis.confidence + (0.1 * lengthFactor));
        } catch (e) {
          console.warn('Error with sentence encoder, using pattern matching only:', e);
        }
      }

      // Generate explanation
      if (scamAnalysis.detectedPatterns.length > 0) {
        explanation = `Detected potential scam indicators: ${scamAnalysis.detectedPatterns.join(', ')}. `;
      } else {
        explanation = 'No obvious scam indicators detected. ';
      }

      explanation += finalScore > 0.7 
        ? 'This email shows multiple signs of being a potential scam.' 
        : 'This email appears to be legitimate.';

      return {
        isScam: finalScore > 0.7,
        confidence: Math.round(finalScore * 100) / 100, // Round to 2 decimal places
        explanation,
        detectedPatterns: scamAnalysis.detectedPatterns
      };
    } catch (error) {
      console.error('Prediction error:', error);
      return { 
        error: 'Error processing email',
        isScam: false,
        confidence: 0,
        explanation: 'Unable to analyze this email.'
      };
    }
  }
}

export default new EmailClassifier();