import { Bot, Lightbulb, Send } from 'lucide-react'
import { useState, useEffect, useRef} from 'react'
import { useNavigate } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import ChatMessage from '../components/ChatMessage'
import Button from '../components/Button'
import { chatWithAgent, getAgentHistory } from '../services/agent.api'
import { useCart } from '../hooks/useCart'
import toast from 'react-hot-toast'
import { useLocation } from 'react-router-dom'


const suggestionChips = [
  'Find a laptop',
  'Compare products',
  'Build my setup',
  'Find something under ₹20k',
]



export default function AgentChat() {

const [messages, setMessages] = useState([]);
const [input, setInput] = useState("");
const [recommendations, setRecommendations] = useState([]);
const [loading, setLoading] = useState(false);
const [quantity, setQuantity] = useState(1)
const [product,setProduct] = useState(null);
const location = useLocation();
const { addItem } = useCart()

const navigate = useNavigate()

const handleAddToCart = async (product) => {
    try{
      await addItem(product._id,quantity)

      toast.success("Added to Cart")
    }catch (error) {
    console.error(error)
    
     toast.error(
        error.response?.data?.message || 'Failed to add product to cart'
      )
    
  }
  }

  const handleSendMessage = async (messageText = input) => {
   if (!messageText.trim() || loading) return

  const userMessage = messageText.trim();


  setMessages((prev) => [
    ...prev,
    {
      role:"user",
      content: userMessage
    }
  ]);

  setInput("");
  setLoading(true);

  try{
    const data = await chatWithAgent(userMessage);

    setMessages((prev)=>[
      ...prev,
      {
        role:"assistant",
        content: data.agentResponse || "I found some products that match your requirements.",

      }
    ]);

    const recommendedProducts = (data.recommendations || [])
  .map((recommendation) => {
    const product = data.products?.find(
      (product) => product._id === recommendation.productId
    );

    if (!product) return null;

    console.log("RECOMMENDED PRODUCT:", product);
    console.log("IMAGE:", product.images?.[0]);

    return {
      ...product,
      reason: recommendation.reason,
    };
  })
  .filter(Boolean);

setRecommendations(recommendedProducts);
  }catch (error) {
    console.error(error);

    setMessages((prev) => [
      ...prev,
      {
        role: "assistant",
        content:
          "Sorry, I couldn't process your request. Please try again.",
      },
    ]);
  } finally {
    setLoading(false);
  }
}

  const chatContainerRef = useRef(null)

  useEffect(() => {
  if (chatContainerRef.current) {
    chatContainerRef.current.scrollTop =
      chatContainerRef.current.scrollHeight
  }
}, [messages, loading])

  useEffect(()=>{
     const loadChatHistory = async () => {
    try {
      const data = await getAgentHistory();

      setMessages(data.messages || []);

      const initialMessage = location.state?.message

      if (initialMessage) {
        await handleSendMessage(initialMessage)

        // Prevent sending the same message again
        navigate('/agent', {
          replace: true,
          state: null
        })
      }
    } catch (error) {
      console.error("Failed to load chat history:", error);
    }
  };

  loadChatHistory();
  },[])


  return (
    <MainLayout>
      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <section className="flex h-[700px] flex-col rounded-[28px] border border-slate-200 bg-white p-4 shadow-[0_8px_20px_rgba(15,23,42,0.03)] sm:p-5">
          <div className="mb-5 flex shrink-0 items-center justify-between border-b border-slate-200 pb-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#edf7ff] text-[#0D94FB]">
                <Bot className="h-5 w-5" />
              </div>
              <div>
                <div className="text-lg font-semibold text-slate-900">Shopping Assistant</div>
                <div className="text-xs text-slate-500">AI-powered recommendations</div>
              </div>
            </div>
            <button className="rounded-full bg-[#edf7ff] px-3 py-1.5 text-xs font-medium text-[#0D94FB]">Online</button>
          </div>
<div ref={chatContainerRef} className='min-h-0 flex-1 overflow-y-auto pr-2'>
          <div className="space-y-4">
           {messages.map((message,index) => (
            <ChatMessage
    key={index}
    role={message.role}
    text={message.content}
    type={message.role}
  />
           ))}

           {loading && (
    <div className="flex items-start gap-3">
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#edf7ff] text-sm font-medium text-[#0D94FB]">
        AI
      </div>

      <div className="rounded-[18px] bg-slate-100 px-4 py-3">
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 animate-bounce rounded-full bg-[#0D94FB]" />
          <span
            className="h-2 w-2 animate-bounce rounded-full bg-[#0D94FB]"
            style={{ animationDelay: "150ms" }}
          />
          <span
            className="h-2 w-2 animate-bounce rounded-full bg-[#0D94FB]"
            style={{ animationDelay: "300ms" }}
          />
        </div>

        <div className="mt-1 text-xs text-slate-400">
          ShopAgent is thinking...
        </div>
      </div>
    </div>
  )}
          </div>
          </div>

                <div className="shrink-0">

          <div className="mt-5 flex flex-wrap gap-2">
            {suggestionChips.map((chip) => (
              <button key={chip} onClick={()=>setInput(chip)} className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-600">{chip}</button>
            ))}
          </div>

          <div className="mt-5 flex items-center gap-3 rounded-[18px] border border-slate-200 bg-white p-2 shadow-sm">
            <input type="text" value={input} onChange={(e) => setInput(e.target.value)}  onKeyDown={(e) => {
    if (e.key === 'Enter') {
      handleSendMessage()
    }
  }} placeholder="Ask me anything..." className="flex-1 border-0 bg-transparent px-2 py-2 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none" />
            <button className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0D94FB] text-white">
              <Send onClick={handleSendMessage}
  disabled={loading || !input.trim()} className="h-4 w-4" />
            </button>
          </div>
          </div>
        </section>

        <aside className="flex h-[700px] flex-col rounded-[28px] border border-slate-200 bg-white p-4 shadow-[0_8px_20px_rgba(15,23,42,0.03)] sm:p-5">
          <div className="mb-4 flex shrink-0 items-center gap-2 text-lg font-semibold text-slate-900">
            <Lightbulb className="h-4 w-4 text-[#0D94FB]" />
            Recommended for you
          </div>
             <div className="min-h-0 flex-1 overflow-y-auto pr-2">

        <div className="space-y-3">
           {recommendations.length === 0 ? (
    <div className="flex min-h-[180px] items-center justify-center px-6 text-center">
      <p className="max-w-xs text-sm leading-6 text-slate-500">
        Ask ShopAgent what you're looking for, and I'll recommend products
        that match your needs.
      </p>
    </div>
  ) :(

          
            recommendations.map((product) => (
              <div key={product._id} className="rounded-[18px] border border-slate-200 bg-slate-50 p-3">
                <div className="flex items-center gap-3">
                  <img src={product.images?.[0]} alt={product.name} className="h-16 w-16 rounded-xl object-cover" />
                  <div className="flex-1">
                    <div className="text-sm font-semibold text-slate-900">{product.name}</div>
                    <div className="mt-1 text-xs text-slate-500">{product.reason}</div>
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-sm font-bold text-slate-900">₹{Number(product.price || 0).toLocaleString('en-IN')}</span>
                  <div className="flex gap-2">
                    <Button onClick={()=>navigate(`/products/${product._id}`)}  variant="secondary" size="sm" className="h-8 rounded-full px-3">View</Button>
                    <Button onClick={()=>handleAddToCart(product)} size="sm" className="h-8 rounded-full px-3">Add</Button>
                  </div>
                </div>
              </div>
            ))
        
  )}
  </div>
  </div>
        </aside>
      </div>
    </MainLayout>
  )
}
