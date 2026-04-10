import React from 'react';
import { Mail, Phone, MapPin, Linkedin, Github, Briefcase, Award, Code, CheckCircle2, Zap, Star, LayoutGrid, Layers } from 'lucide-react';

export const Pheonix: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans relative overflow-x-hidden selection:bg-indigo-200">
      
      {/* Abstract Background Elements (From Creative Architect) */}
      <div className="fixed top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-indigo-200/40 blur-[100px] pointer-events-none -z-10"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-rose-200/40 blur-[100px] pointer-events-none -z-10"></div>

      <div className="max-w-5xl mx-auto px-6 py-16 md:py-24 space-y-20">
        
        {/* Header / Hero */}
        <header className="relative">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-indigo-100 text-indigo-700 font-bold text-sm mb-8 shadow-sm">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-500"></span>
            </span>
            Strategic Technical Lead
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-indigo-900 to-rose-800">
            TAWANDA<br/>KANYANGARARA.
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-600 font-light max-w-3xl leading-snug mb-10">
            I engineer <span className="font-bold text-indigo-600">enterprise platforms</span> and build <span className="font-bold text-rose-500">high-performance teams</span> across fintech and insurance.
          </p>
          
          {/* Corporate Contact Bar (From Modern Executive) */}
          <div className="flex flex-wrap gap-5 text-sm md:text-base text-slate-600 font-medium bg-white/60 backdrop-blur p-4 rounded-2xl border border-slate-200/60 shadow-sm inline-flex">
            <span className="flex items-center gap-2"><MapPin size={18} className="text-indigo-500" /> Guildford, UK</span>
            <span className="flex items-center gap-2"><Mail size={18} className="text-indigo-500" /> klish3@gmail.com</span>
            <span className="flex items-center gap-2"><Phone size={18} className="text-indigo-500" /> +44 7517 199332</span>
            <span className="flex items-center gap-2 text-indigo-600 hover:text-rose-500 transition-colors cursor-pointer"><Linkedin size={18} /> LinkedIn</span>
            <span className="flex items-center gap-2 text-indigo-600 hover:text-rose-500 transition-colors cursor-pointer"><Github size={18} /> GitHub</span>
          </div>
        </header>

        {/* Bento Grid: Profile & Highlights */}
        <section className="grid md:grid-cols-3 gap-6">
          {/* Executive Profile Card */}
          <div className="md:col-span-2 bg-white rounded-3xl p-8 md:p-10 shadow-xl shadow-indigo-100/40 border border-slate-100 flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-6">
              <Layers className="text-indigo-500" size={28} />
              <h3 className="text-2xl font-bold text-slate-900">Executive Profile</h3>
            </div>
            <p className="text-slate-600 text-lg leading-relaxed">
              Strategic Technical Lead with 10+ years architecting high-performance React/TypeScript applications across fintech, insurance, and pan-African banking. Proven track record of delivering enterprise-scale platforms that protect revenue, prevent fraud, and accelerate claims settlement. Expert at building and leading engineering teams, founding governance frameworks, and deploying cloud-native infrastructure on AWS. Equally effective working at the system-design level and hands-on in the codebase.
            </p>
          </div>
          
          {/* Star Highlight Card */}
          <div className="bg-gradient-to-br from-indigo-600 to-rose-500 rounded-3xl p-8 text-white shadow-xl shadow-rose-200/50 flex flex-col justify-end relative overflow-hidden">
            <Star className="absolute top-8 right-8 text-white/20" size={80} />
            <Award className="mb-auto text-white/80" size={32} />
            <h3 className="text-4xl font-black mb-2 mt-8">2019</h3>
            <p className="font-bold text-white text-lg leading-tight mb-2">World Economic Forum</p>
            <p className="text-sm text-white/80">Trade Loans platform showcased by Absa CEO as a flagship African digital banking innovation.</p>
          </div>

          {/* Additional Highlights */}
          <div className="md:col-span-3 bg-indigo-50 rounded-3xl p-8 border border-indigo-100">
            <h3 className="text-lg font-bold text-indigo-900 mb-6 flex items-center gap-2">
              <Zap className="text-indigo-500" size={20} /> Innovation Milestones
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="text-rose-500 shrink-0 mt-0.5" size={20} />
                <p className="text-sm text-indigo-900"><strong className="block mb-1">Front-End Guild Founder</strong> Established esure's first enterprise UI governance, reducing tech debt by 40%.</p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="text-rose-500 shrink-0 mt-0.5" size={20} />
                <p className="text-sm text-indigo-900"><strong className="block mb-1">Fraud Detection Pioneer</strong> Built first-ever fraud system at esure, achieving 100% tracking from day one.</p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="text-rose-500 shrink-0 mt-0.5" size={20} />
                <p className="text-sm text-indigo-900"><strong className="block mb-1">Conversational AI</strong> Delivered interface serving 80% of claimants and cutting processing time by 35%.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Experience Timeline */}
        <section>
          <div className="flex items-center gap-3 mb-10">
            <Briefcase className="text-indigo-600" size={32} />
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">Career Architecture</h2>
          </div>

          <div className="space-y-12 border-l-4 border-indigo-100 ml-4 md:ml-6 pl-8 md:pl-10">
            
            {/* esure Tech Lead */}
            <div className="relative">
              <div className="absolute w-10 h-10 bg-indigo-600 rounded-full -left-[62px] md:-left-[70px] -top-2 border-4 border-slate-50 shadow-md flex items-center justify-center text-white">
                <Briefcase size={16} />
              </div>
              <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-3">
                <h3 className="text-2xl font-bold text-slate-900">esure Group</h3>
                <span className="text-sm font-bold text-indigo-600 uppercase tracking-wider bg-indigo-50 px-3 py-1 rounded-full mt-2 md:mt-0 inline-block w-fit">Dec 2022 - Present</span>
              </div>
              <p className="text-rose-500 font-bold mb-5 text-lg">Technical Lead - Digital Claims <span className="text-slate-400 font-medium ml-2 text-base">• Reigate, UK</span></p>
              
              <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-slate-100">
                <ul className="space-y-3 text-slate-600 text-base">
                  <li className="flex gap-3"><span className="text-indigo-400 mt-1">●</span> <span>Leading front-end engineering for a £1B+ insurance provider. Managing cross-functional teams (5–7 devs/QAs) across 15+ production apps.</span></li>
                  <li className="flex gap-3"><span className="text-indigo-400 mt-1">●</span> <span>Architected AWS Synthetics Canaries via Grafana, reducing system downtime by 60%.</span></li>
                  <li className="flex gap-3"><span className="text-indigo-400 mt-1">●</span> <span>Led Motor Claims 'Save & Edit', boosting digital adoption to 42.2% by mid-2025.</span></li>
                  <li className="flex gap-3"><span className="text-indigo-400 mt-1">●</span> <span>Co-architected the LEXIT programme: zero-downtime legacy claims system phase-out to the new Edison platform.</span></li>
                  <li className="flex gap-3"><span className="text-indigo-400 mt-1">●</span> <span>Led 'Golden Images' security rollout, achieving ~100% compliance for customer-facing applications.</span></li>
                </ul>
              </div>
            </div>

            {/* esure Senior */}
            <div className="relative">
              <div className="absolute w-6 h-6 bg-indigo-300 rounded-full -left-[54px] md:-left-[62px] top-1 border-4 border-slate-50 shadow-sm"></div>
              <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-2">
                <h3 className="text-xl font-bold text-slate-900">esure Group</h3>
                <span className="text-sm font-bold text-slate-500 uppercase tracking-wider mt-1 md:mt-0">Aug 2020 - Dec 2022</span>
              </div>
              <p className="text-indigo-600 font-medium mb-4">Senior Front-End Developer <span className="text-slate-400 font-medium ml-2">• Reigate, UK</span></p>
              
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                <ul className="space-y-2 text-slate-600">
                  <li className="flex gap-2"><span className="text-slate-300 mt-1">●</span> <span>Built dynamic claims portals with Angular/React and GraphQL.</span></li>
                  <li className="flex gap-2"><span className="text-slate-300 mt-1">●</span> <span>Led 2021 redesign by implementing WCAG 2.1 accessibility standards.</span></li>
                  <li className="flex gap-2"><span className="text-slate-300 mt-1">●</span> <span>Reduced initial bundle size by 30% through Webpack lazy-loading optimization.</span></li>
                </ul>
              </div>
            </div>

            {/* Stena */}
            <div className="relative">
              <div className="absolute w-6 h-6 bg-slate-300 rounded-full -left-[54px] md:-left-[62px] top-1 border-4 border-slate-50 shadow-sm"></div>
              <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-2">
                <h3 className="text-xl font-bold text-slate-900">Stena Group IT</h3>
                <span className="text-sm font-bold text-slate-500 uppercase tracking-wider mt-1 md:mt-0">Feb 2023 - Jul 2023</span>
              </div>
              <p className="text-indigo-600 font-medium mb-4">React Native Lead Developer (Contract) <span className="text-slate-400 font-medium ml-2">• Remote</span></p>
              
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                <ul className="space-y-2 text-slate-600">
                  <li className="flex gap-2"><span className="text-slate-300 mt-1">●</span> <span>Led digital travel assistant app development across iOS/Android.</span></li>
                  <li className="flex gap-2"><span className="text-slate-300 mt-1">●</span> <span>Architected NestJS BFF layer, reducing latency by 45%.</span></li>
                  <li className="flex gap-2"><span className="text-slate-300 mt-1">●</span> <span>Served as Security Champion ensuring GDPR compliance and 99.8% uptime.</span></li>
                </ul>
              </div>
            </div>

            {/* Absa */}
            <div className="relative">
              <div className="absolute w-6 h-6 bg-slate-300 rounded-full -left-[54px] md:-left-[62px] top-1 border-4 border-slate-50 shadow-sm"></div>
              <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-2">
                <h3 className="text-xl font-bold text-slate-900">Barclays Africa Group (Absa)</h3>
                <span className="text-sm font-bold text-slate-500 uppercase tracking-wider mt-1 md:mt-0">2016 - 2019</span>
              </div>
              <p className="text-indigo-600 font-medium mb-4">Lead Developer <span className="text-slate-400 font-medium ml-2">• South Africa</span></p>
              
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                <ul className="space-y-2 text-slate-600">
                  <li className="flex gap-2"><span className="text-slate-300 mt-1">●</span> <span>Sole developer of pan-African Trade Loans Channel.</span></li>
                  <li className="flex gap-2"><span className="text-slate-300 mt-1">●</span> <span>Implemented Keycloak 4.8 IAM securing mission-critical banking apps.</span></li>
                  <li className="flex gap-2"><span className="text-slate-300 mt-1">●</span> <span>Led legacy modernisation: migrated AngularJS to Angular 4+ and set up CI/CD.</span></li>
                </ul>
              </div>
            </div>

          </div>
        </section>

        {/* Technical Expertise */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <LayoutGrid className="text-indigo-600" size={32} />
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">Technical Expertise</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-lg shadow-indigo-100/20 hover:border-indigo-200 transition-colors">
              <h4 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Code size={20} className="text-rose-500"/> Front-End
              </h4>
              <p className="text-slate-600 leading-relaxed font-medium">React.js, TypeScript, JavaScript (ES6+), React Native, Angular, Next.js, HTML5, CSS3, Responsive Design, WCAG Accessibility</p>
            </div>
            
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-lg shadow-indigo-100/20 hover:border-indigo-200 transition-colors">
              <h4 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Star size={20} className="text-indigo-500"/> Back-End & Cloud
              </h4>
              <p className="text-slate-600 leading-relaxed font-medium">Node.js, NestJS, Java Spring Boot, GraphQL, RESTful APIs, AWS (Synthetics, Lambda, S3, CloudWatch), Terraform</p>
            </div>
            
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-lg shadow-indigo-100/20 hover:border-indigo-200 transition-colors">
              <h4 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Zap size={20} className="text-rose-500"/> DevOps & Security
              </h4>
              <p className="text-slate-600 leading-relaxed font-medium">CI/CD (Jenkins, GitHub Actions), Docker, Kubernetes, OpenShift, Keycloak IAM, GDPR, OS Hardening, Grafana</p>
            </div>
            
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-lg shadow-indigo-100/20 hover:border-indigo-200 transition-colors">
              <h4 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Award size={20} className="text-indigo-500"/> Education & Certs
              </h4>
              <p className="text-slate-600 leading-relaxed font-medium">BA (Hons) Digital Media Design (UAL). Diploma Visual Communication. AWS Essential Training, Data Privacy Champion.</p>
            </div>
          </div>
        </section>

      </div>
      
      <footer className="bg-slate-900 text-slate-400 py-10 text-center mt-12 border-t border-slate-800">
        <p className="text-sm font-medium">© {new Date().getFullYear()} Tawanda Kanyangarara. Built with React & Tailwind.</p>
      </footer>
    </div>
  );
}