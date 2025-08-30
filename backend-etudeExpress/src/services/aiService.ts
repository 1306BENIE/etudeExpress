import OpenAI from "openai";
import { StudyRequest } from "../types/study";
import { config } from "../config/config";

const openai = new OpenAI({
  apiKey: config.openai.apiKey,
});

interface ChatContext {
  userId?: string | undefined;
  studyId?: string | undefined;
  sessionId: string;
}

interface AIResponse {
  content: string;
  intent?: string;
  confidence?: number;
}

export const aiService = {
  async generateMarketStudy(request: StudyRequest) {
    // Check if OpenAI API key is configured
    if (!config.openai.isConfigured) {
      console.warn(
        "⚠️  Using fallback study generation - OpenAI API key not configured"
      );
      return this.generateFallbackStudy(request);
    }

    const prompt = `
    Génère une étude de marché complète pour le projet suivant en Côte d'Ivoire/Afrique:
    
    Projet: ${request.projectName}
    Secteur: ${request.sector}
    Marché cible: ${request.targetMarket}
    Localisation: ${request.location}
    Budget: ${request.budget} FCFA
    Timeline: ${request.timeline}
    Objectifs: ${request.objectives.join(", ")}
    ${
      request.specificQuestions
        ? `Questions spécifiques: ${request.specificQuestions.join(", ")}`
        : ""
    }

    Fournis une analyse structurée incluant:
    1. Taille du marché en FCFA
    2. Taux de croissance annuel
    3. 3-5 concurrents principaux avec leurs parts de marché
    4. Tendances du marché
    5. Opportunités et menaces
    6. Projections financières sur 5 ans
    7. Recommandations stratégiques
    8. Analyse des risques
    9. Résumé exécutif

    Adapte l'analyse au contexte économique africain et ivoirien.
    `;

    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content:
              "Tu es un expert en études de marché spécialisé dans l'économie africaine et ivoirienne. Tu fournis des analyses précises, réalistes et adaptées au contexte local.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 3000,
      });

      const response = completion.choices[0]?.message?.content;
      if (!response) {
        throw new Error("Aucune réponse de l'IA");
      }

      // Parse and structure the AI response
      return this.parseStudyResponse(response, request);
    } catch (error) {
      console.error("AI Service Error:", error);
      // Return fallback data
      return this.generateFallbackStudy(request);
    }
  },

  async generateChatResponse(
    message: string,
    context: ChatContext
  ): Promise<AIResponse> {
    const prompt = `
    Tu es un assistant IA spécialisé dans les études de marché en Afrique.
    Réponds à la question suivante de manière professionnelle et utile:
    
    Question: ${message}
    
    Contexte: Assistant pour études de marché en Côte d'Ivoire et Afrique
    Ton: Professionnel mais accessible
    Langue: Français
    `;

    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content:
              "Tu es un expert en études de marché pour l'Afrique. Tu aides les entrepreneurs avec des conseils pratiques et des informations fiables.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.8,
        max_tokens: 500,
      });

      const response = completion.choices[0]?.message?.content;

      return {
        content: response || "Désolé, je n'ai pas pu traiter votre demande.",
        intent: this.detectIntent(message),
        confidence: 0.8,
      };
    } catch (error) {
      console.error("Chat AI Error:", error);
      return {
        content:
          "Désolé, je rencontre des difficultés techniques. Veuillez réessayer dans quelques instants.",
        intent: "error",
        confidence: 0.1,
      };
    }
  },

  parseStudyResponse(response: string, request: StudyRequest) {
    // This is a simplified parser - in production, you'd want more sophisticated parsing
    const marketSize =
      this.extractNumber(response, /taille.*marché.*?(\d+(?:\.\d+)?)/i) ||
      request.budget * 10; // Fallback estimation

    const growthRate =
      this.extractNumber(response, /croissance.*?(\d+(?:\.\d+)?)/i) || 8.5;

    return {
      marketData: {
        marketSize,
        growthRate,
        competitors: this.generateCompetitors(request.sector),
        trends: this.generateTrends(request.sector),
        opportunities: this.generateOpportunities(request),
        threats: this.generateThreats(request),
      },
      financialProjections: this.generateFinancialProjections(
        request.budget,
        growthRate
      ),
      recommendations: this.generateRecommendations(request),
      riskAnalysis: this.generateRiskAnalysis(request),
      executiveSummary: this.generateExecutiveSummary(
        request,
        marketSize,
        growthRate
      ),
    };
  },

  generateFallbackStudy(request: StudyRequest) {
    const marketSize = request.budget * 8;
    const growthRate = 7.2;

    return {
      marketData: {
        marketSize,
        growthRate,
        competitors: this.generateCompetitors(request.sector),
        trends: this.generateTrends(request.sector),
        opportunities: this.generateOpportunities(request),
        threats: this.generateThreats(request),
      },
      financialProjections: this.generateFinancialProjections(
        request.budget,
        growthRate
      ),
      recommendations: this.generateRecommendations(request),
      riskAnalysis: this.generateRiskAnalysis(request),
      executiveSummary: this.generateExecutiveSummary(
        request,
        marketSize,
        growthRate
      ),
    };
  },

  extractNumber(text: string, regex: RegExp): number | null {
    const match = text.match(regex);
    return match && match[1] ? parseFloat(match[1]) : null;
  },

  generateCompetitors(sector: string) {
    const competitorsByeSector: Record<string, any[]> = {
      "Technologies et Digital": [
        {
          name: "Orange Digital Center",
          marketShare: 25,
          strengths: ["Infrastructure", "Réseau"],
          weaknesses: ["Innovation"],
          pricing: "Premium",
        },
        {
          name: "MTN Business",
          marketShare: 20,
          strengths: ["Couverture"],
          weaknesses: ["Service client"],
          pricing: "Moyen",
        },
        {
          name: "Startups locales",
          marketShare: 15,
          strengths: ["Agilité"],
          weaknesses: ["Financement"],
          pricing: "Compétitif",
        },
      ],
      "Commerce et Distribution": [
        {
          name: "Prosuma",
          marketShare: 30,
          strengths: ["Distribution"],
          weaknesses: ["Digital"],
          pricing: "Moyen",
        },
        {
          name: "CFAO",
          marketShare: 25,
          strengths: ["Expérience"],
          weaknesses: ["Innovation"],
          pricing: "Premium",
        },
        {
          name: "Commerçants locaux",
          marketShare: 20,
          strengths: ["Proximité"],
          weaknesses: ["Technologie"],
          pricing: "Bas",
        },
      ],
    };

    return (
      competitorsByeSector[sector] || [
        {
          name: "Concurrent A",
          marketShare: 30,
          strengths: ["Expérience"],
          weaknesses: ["Innovation"],
          pricing: "Moyen",
        },
        {
          name: "Concurrent B",
          marketShare: 25,
          strengths: ["Prix"],
          weaknesses: ["Qualité"],
          pricing: "Bas",
        },
        {
          name: "Concurrent C",
          marketShare: 20,
          strengths: ["Qualité"],
          weaknesses: ["Prix"],
          pricing: "Premium",
        },
      ]
    );
  },

  generateTrends(sector: string): string[] {
    const trendsBySector: Record<string, string[]> = {
      "Technologies et Digital": [
        "Adoption croissante du mobile money",
        "Digitalisation des services publics",
        "Émergence de l'e-commerce",
        "Développement de la fintech",
      ],
      "Agriculture et Agroalimentaire": [
        "Agriculture de précision",
        "Transformation locale",
        "Circuits courts",
        "Agriculture biologique",
      ],
    };

    return (
      trendsBySector[sector] || [
        "Croissance du marché local",
        "Adoption des nouvelles technologies",
        "Évolution des habitudes de consommation",
        "Développement de l'économie numérique",
      ]
    );
  },

  generateOpportunities(request: StudyRequest): string[] {
    return [
      `Marché en croissance dans le secteur ${request.sector}`,
      `Demande croissante à ${request.location}`,
      "Faible concurrence sur certains segments",
      "Soutien gouvernemental aux entrepreneurs",
      "Adoption croissante du digital",
    ];
  },

  generateThreats(request: StudyRequest): string[] {
    return [
      "Concurrence internationale",
      "Instabilité économique régionale",
      "Défis d'infrastructure",
      "Réglementation changeante",
      "Accès limité au financement",
    ];
  },

  generateFinancialProjections(budget: number, growthRate: number) {
    const projections = [];
    let revenue = budget * 0.8;
    let costs = budget * 0.6;

    for (let year = 1; year <= 5; year++) {
      const profit = revenue - costs;
      const roi = (profit / budget) * 100;

      projections.push({
        year,
        revenue: Math.round(revenue),
        costs: Math.round(costs),
        profit: Math.round(profit),
        roi: Math.round(roi * 100) / 100,
      });

      revenue *= 1 + growthRate / 100;
      costs *= 1 + (growthRate - 2) / 100;
    }

    return projections;
  },

  generateRecommendations(request: StudyRequest): string[] {
    return [
      `Concentrez-vous sur le marché ${request.targetMarket} pour commencer`,
      "Développez une stratégie digitale forte",
      "Établissez des partenariats locaux stratégiques",
      "Investissez dans la formation de votre équipe",
      "Surveillez régulièrement la concurrence",
    ];
  },

  generateRiskAnalysis(request: StudyRequest): string[] {
    return [
      "Risque de concurrence accrue",
      "Dépendance aux conditions économiques locales",
      "Défis liés à l'infrastructure",
      "Risques réglementaires",
      "Volatilité du marché des changes",
    ];
  },

  generateExecutiveSummary(
    request: StudyRequest,
    marketSize: number,
    growthRate: number
  ): string {
    return `Le projet "${request.projectName}" dans le secteur ${
      request.sector
    } présente un potentiel intéressant sur le marché ${request.location}. 
    
    Avec une taille de marché estimée à ${marketSize.toLocaleString()} FCFA et un taux de croissance de ${growthRate}%, ce projet s'inscrit dans une dynamique positive. 
    
    Le marché cible "${
      request.targetMarket
    }" offre des opportunités de développement, notamment grâce à l'évolution des habitudes de consommation et à l'adoption croissante des technologies digitales.
    
    Avec un budget de ${request.budget.toLocaleString()} FCFA sur une période de ${
      request.timeline
    }, le projet peut atteindre la rentabilité en respectant les recommandations stratégiques proposées.`;
  },

  detectIntent(message: string): string {
    const lowerMessage = message.toLowerCase();

    if (
      lowerMessage.includes("prix") ||
      lowerMessage.includes("coût") ||
      lowerMessage.includes("tarif")
    ) {
      return "pricing";
    }
    if (
      lowerMessage.includes("concurrent") ||
      lowerMessage.includes("compétition")
    ) {
      return "competition";
    }
    if (lowerMessage.includes("marché") || lowerMessage.includes("taille")) {
      return "market_analysis";
    }
    if (lowerMessage.includes("aide") || lowerMessage.includes("comment")) {
      return "help";
    }

    return "general";
  },
};
