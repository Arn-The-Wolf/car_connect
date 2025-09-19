import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Send, Bot, User, MessageCircle, HelpCircle, Phone, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
}

const Support = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! I'm CarConnect's virtual assistant. How can I help you today? You can ask me about car availability, pricing, booking test drives, or any other questions about our services.",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Car availability questions
    if (lowerMessage.includes("available") || lowerMessage.includes("availability")) {
      return "To check car availability, you can browse our current inventory by visiting the 'Buy Cars' section. All cars listed there are currently available for purchase or test drive. If you're looking for a specific make or model, I can help you search for it!";
    }
    
    // Pricing questions
    if (lowerMessage.includes("price") || lowerMessage.includes("cost") || lowerMessage.includes("expensive")) {
      return "Our car prices vary based on make, model, year, and condition. You can view detailed pricing for each vehicle on our listings page. We also offer financing options and sometimes have special discounts available. Would you like me to help you find cars within a specific price range?";
    }
    
    // Test drive questions
    if (lowerMessage.includes("test drive") || lowerMessage.includes("booking") || lowerMessage.includes("schedule")) {
      return "To book a test drive, simply go to any car's detail page and click the 'Schedule Test Drive' button. You'll need to be signed in to your account. Test drives can typically be scheduled 1-7 days in advance. Is there a specific car you'd like to test drive?";
    }
    
    // Contact/seller questions
    if (lowerMessage.includes("contact") || lowerMessage.includes("seller") || lowerMessage.includes("owner")) {
      return "You can contact car sellers directly through each listing. On the car detail page, you'll find the seller's contact information or a 'Contact Seller' button. For general inquiries, you can also reach our support team at support@carconnect.com or call us at +250 123 456 789.";
    }
    
    // Payment questions
    if (lowerMessage.includes("payment") || lowerMessage.includes("financing") || lowerMessage.includes("loan")) {
      return "We accept various payment methods including bank transfers, mobile money, and financing options. For large purchases, we can help connect you with financing partners. Payment details will be discussed during the purchase process with the seller.";
    }
    
    // Account questions
    if (lowerMessage.includes("account") || lowerMessage.includes("profile") || lowerMessage.includes("login")) {
      return "You can manage your account by signing in and accessing your dashboard. There you can view your orders, wishlist, bookings, and update your profile information. If you're having trouble logging in, please check your phone number and password.";
    }
    
    // Location/delivery questions
    if (lowerMessage.includes("location") || lowerMessage.includes("delivery") || lowerMessage.includes("pickup")) {
      return "Most of our cars are located throughout Rwanda. Each listing shows the car's location. For delivery arrangements, please discuss directly with the seller. Some sellers may offer delivery services for an additional fee.";
    }
    
    // General greetings
    if (lowerMessage.includes("hello") || lowerMessage.includes("hi") || lowerMessage.includes("hey")) {
      return "Hello! Welcome to CarConnect. I'm here to help you with any questions about our cars, services, or platform. What would you like to know?";
    }
    
    // Thank you
    if (lowerMessage.includes("thank") || lowerMessage.includes("thanks")) {
      return "You're welcome! Is there anything else I can help you with today?";
    }
    
    // Default response
    return "I'd be happy to help you with that! For specific questions about our cars, pricing, test drives, or services, please feel free to ask. You can also contact our human support team at support@carconnect.com for more detailed assistance.";
  };

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: generateBotResponse(inputMessage),
        sender: "bot",
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  const quickQuestions = [
    "Is this car still available?",
    "What's the lowest price?",
    "Can I schedule a test drive?",
    "Do you offer financing?",
    "What's included in the price?",
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div className="flex items-center gap-2">
            <MessageCircle className="h-6 w-6 text-primary" />
            <h1 className="text-3xl font-bold">Support</h1>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Chat Interface */}
          <div className="lg:col-span-2">
            <Card className="h-[600px] flex flex-col">
              <CardHeader className="border-b">
                <CardTitle className="flex items-center gap-2">
                  <Bot className="h-5 w-5 text-primary" />
                  CarConnect Assistant
                  <Badge variant="secondary" className="ml-auto">Online</Badge>
                </CardTitle>
              </CardHeader>
              
              <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex items-start gap-3 ${
                      message.sender === "user" ? "flex-row-reverse" : ""
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      message.sender === "user" 
                        ? "bg-primary text-primary-foreground" 
                        : "bg-muted"
                    }`}>
                      {message.sender === "user" ? (
                        <User className="h-4 w-4" />
                      ) : (
                        <Bot className="h-4 w-4" />
                      )}
                    </div>
                    
                    <div className={`max-w-[80%] p-3 rounded-lg ${
                      message.sender === "user"
                        ? "bg-primary text-primary-foreground ml-auto"
                        : "bg-muted"
                    }`}>
                      <p className="text-sm">{message.content}</p>
                      <p className={`text-xs mt-2 ${
                        message.sender === "user" 
                          ? "text-primary-foreground/70" 
                          : "text-muted-foreground"
                      }`}>
                        {message.timestamp.toLocaleTimeString([], { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </p>
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                      <Bot className="h-4 w-4" />
                    </div>
                    <div className="bg-muted p-3 rounded-lg">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </CardContent>
              
              <div className="border-t p-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Type your message..."
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="flex-1"
                  />
                  <Button onClick={sendMessage} disabled={!inputMessage.trim()}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Questions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <HelpCircle className="h-5 w-5" />
                  Quick Questions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {quickQuestions.map((question, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    className="w-full text-left justify-start h-auto p-3"
                    onClick={() => setInputMessage(question)}
                  >
                    {question}
                  </Button>
                ))}
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Contact Support</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-sm text-muted-foreground">support@carconnect.com</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Phone</p>
                    <p className="text-sm text-muted-foreground">+250 123 456 789</p>
                  </div>
                </div>
                
                <div className="pt-2">
                  <p className="text-sm text-muted-foreground">
                    Available Monday - Friday, 8:00 AM - 6:00 PM (GMT+2)
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Help Topics */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Popular Help Topics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="ghost" size="sm" className="w-full justify-start">
                  How to buy a car
                </Button>
                <Button variant="ghost" size="sm" className="w-full justify-start">
                  Payment methods
                </Button>
                <Button variant="ghost" size="sm" className="w-full justify-start">
                  Test drive booking
                </Button>
                <Button variant="ghost" size="sm" className="w-full justify-start">
                  Account management
                </Button>
                <Button variant="ghost" size="sm" className="w-full justify-start">
                  Seller guidelines
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;